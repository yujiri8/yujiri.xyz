from fastapi import APIRouter, HTTPException, Header, Body, Response, Request, Depends, BackgroundTasks
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

import datetime

from db import User, Comment, Subscription
from common import env
from email_templates import *
import users, util, emails, email_templates

router = APIRouter()

@router.get('/comments')
async def get_comments(reply_to = '', id: int = 0, raw: bool = False, env = Depends(env)):
	# Case 1: all comments replying to something.
	if reply_to:
		# Don't get messed up by polynymous index pages.
		if reply_to.endswith('/index'):
			reply_to = reply_to[:-5]
		comments = env.db.query(Comment).filter_by(reply_to = reply_to). \
			order_by(Comment.time_added.desc())
		return [c.dict(env.db, user = env.user, raw = raw) for c in comments]
	# Case 2: a specific comment requested.
	elif id:
		comment = env.db.query(Comment).get(id)
		return comment.dict(env.db, user = env.user, raw = raw)
	else:
		raise HTTPException(status_code = 400)

@router.get('/recent_comments')
async def recent_comments(count: int = 10, env = Depends(env)):
	comments = env.db.query(Comment).order_by(Comment.time_added.desc())[:int(count)]
	return [comment.summary_dict() for comment in comments]

@router.post('/comments/preview')
async def preview_comment(req: Request):
	return HTMLResponse(util.markdown((await req.body()).decode('utf8')))

class PostCommentParams(BaseModel):
	name: str
	email: str = ''
	reply_to: str
	body: str
@router.post('/comments')
async def post_comment(
	params: PostCommentParams,
	response: Response,
	bg: BackgroundTasks,
	x_forwarded_for = Header(''),
	user_agent = Header(''),
	env = Depends(env),
):
	# If it's a reply, get the article path from the parent comment.
	if '/' not in params.reply_to:
		article_path = env.db.query(Comment).get(params.reply_to).article_path
	# Otherwise, make sure it exists.
	else:
		if not util.article_exists(params.reply_to):
			raise HTTPException(status_code = 404)
		if params.reply_to == '/404':
			return HttpException(status_code = 400, detail = "You can't comment on that URL")
		# Strip 'index'.
		if params.reply_to.endswith('/index'): params.reply_to = params.reply_to[:-5]
		article_path = params.reply_to
	cmt = Comment(
		name = params.name,
		reply_to = params.reply_to,
		body = params.body,
		article_path = article_path,
		article_title = util.get_article_title(article_path),
		ip = x_forwarded_for,
		ua = user_agent,
		user = env.user,
	)
	cmt.validate()
	# Prevent name impersonation.
	name_user = env.db.query(User).filter_by(name = cmt.name).one_or_none()
	if name_user and (not cmt.user or cmt.user != name_user):
		raise HTTPException(status_code = 401, detail =
			"That name is taken by a registered user.")
	# If it's not a logged in user, check for an email.
	if not cmt.user and params.email:
		# Determine if the email is already claimed.
		email_user = env.db.query(User).filter_by(email = params.email).one_or_none()
		if not email_user:
			# The email isn't claimed yet, so assume they have it and try to register it.
			cmt.user = users.register_email(env.db, params.email)
		else:
			# It's a registered user's email.
			raise HTTPException(status_code = 401, detail = "That email belongs to a registered user." +
				" If it's you and you just claimed it, check your inbox for a registration link.")
	env.db.add(cmt)
	# Subscribe the user who posted it.
	if cmt.user and cmt.user.autosub:
		env.db.add(Subscription(user = cmt.user, comment = cmt))
	env.db.commit()
	bg.add_task(send_reply_notifs, env.db, cmt)

class EditCommentParams(BaseModel):
	id: int
	name: str
	body: str
@router.put('/comments')
async def edit_comment(params: EditCommentParams, env = Depends(env)):
	cmt = env.db.query(Comment).get(params.id)
	if not env.user:
		raise HTTPException(status_code = 401)
	if env.user != cmt.user and not env.user.admin:
		raise HTTPException(status_code = 403)
	cmt.name = params.name
	cmt.body = params.body
	cmt.time_changed = datetime.datetime.now()
	err = cmt.validate()
	if err: raise HTTPException(status_code = 400, detail = err)
	env.db.add(cmt)
	env.db.commit()

@router.delete('/comments')
async def delete_comment(req: Request, env = Depends(env)):
	id = int(await req.body())
	if not env.user:
		raise HTTPException(status_code = 401)
	if not env.user.admin:
		raise HTTPException(status_code = 403)
	env.db.query(Comment).filter_by(id = id).delete()
	env.db.commit()

def send_reply_notifs(db, new_comment):
	listening = set()
	ignoring = set()
	# Never notify people about their own comment.
	if new_comment.user: ignoring.add(new_comment.user)
	# Travel up the tree, finding the lowest-level subscription or ignore for each user.
	comment = new_comment
	while True:
		for sub in comment.subs:
			# If it's a sub and not overridden by a more specific ignore.
			if sub.sub and sub.user not in ignoring:
				listening.add(sub.user)
			# If it's an ignore and not overridden by a more specific sub.
			elif sub.user not in listening:
				ignoring.add(sub.user)
		# Finish if we're at the top level.
		if '/' in comment.reply_to: break
		# Else, get the parent comment.
		comment = db.query(Comment).get(comment.reply_to)
	# Email everybody.
	for user in listening:
		emails.send(util.SERVER_EMAIL, [user.email], "New reply on yujiri.xyz", REPLY_NOTIF_TXT.format(
			title = new_comment.article_title,
			name = new_comment.name,
			time = new_comment.time_added.strftime("%b %d, %A, %R (UTC)"),
			body = new_comment.body,
			link = 'https://yujiri.xyz' + new_comment.summary_dict()['link'],
		))
