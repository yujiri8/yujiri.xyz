from fastapi import APIRouter, HTTPException, Request, Header, Body, Depends, BackgroundTasks
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

import datetime

from db import User, Comment, Subscription, ArticleSubscription
from common import env, require_login, require_admin
from email_templates import *
import users, util, emails

router = APIRouter()

@router.get('/comments')
async def get_comments(reply_to = '', id: int = 0, raw: bool = False, env = Depends(env)):
	# Case 1: all comments replying to something.
	if reply_to:
		# It's a reply.
		if reply_to.isnumeric():
			comments = env.db.query(Comment).filter_by(reply_to = int(reply_to)).order_by(Comment.time_added.desc())
		# It's top-level.
		else:
			# Don't get messed up by polynymous index pages.
			if reply_to.endswith('/index'):
				reply_to = reply_to[:-5]
			comments = env.db.query(Comment).filter_by(reply_to = None, article_path = reply_to) \
				.order_by(Comment.time_added.desc())
		return [c.dict(env.db, user = env.user, raw = raw) for c in comments]
	# Case 2: a specific comment requested.
	if id:
		comment = env.db.query(Comment).get(id)
		if not comment: raise HTTPException(status_code = 404, detail = "That comment doesn't exist")
		return comment.dict(env.db, user = env.user, raw = raw)
	raise HTTPException(status_code = 400)

@router.get('/recent_comments')
async def recent_comments(count: int = 10, env = Depends(env)):
	comments = env.db.query(Comment).order_by(Comment.time_added.desc())[:int(count)]
	return [comment.summary_dict() for comment in comments]

@router.post('/comments/preview')
async def preview_comment(req: Request):
	return HTMLResponse(util.markdown((await req.body()).decode('utf8')))

@router.post('/comments')
async def post_comment(
	bg: BackgroundTasks,
	name = Body(''),
	body = Body(''),
	email = Body(''),
	reply_to = Body(None),
	article_path = Body(''),
	sub_site: bool = Body(False),
	x_forwarded_for = Header(''),
	user_agent = Header(''),
	env = Depends(env),
):
	# If it's a reply, get the article path from the parent comment.
	if reply_to:
		article_path = env.db.query(Comment).get(reply_to).article_path
	# Otherwise, make sure the article exists.
	else:
		if not util.article_exists(article_path):
			raise HTTPException(status_code = 404, detail = "That article doesn't exist")
		if reply_to == '/404':
			raise HTTPException(status_code = 400, detail = "You can't comment on that URL")
		# Strip 'index'.
		if article_path.endswith('/index'): article_path = article_path[:-5]
	cmt = Comment(
		name = name,
		reply_to = reply_to,
		body = body,
		article_path = article_path,
		article_title = util.get_article_title(article_path),
		ip = x_forwarded_for,
		ua = user_agent,
		user = env.user,
	)
	cmt.validate()
	# Prevent name impersonation.
	name_user = env.db.query(User).filter_by(name = name).one_or_none()
	if name_user and (not env.user or env.user != name_user):
		raise HTTPException(status_code = 401, detail = "That name is taken by a registered user.")
	# If it's not a logged in user, check for an email.
	if not env.user and email:
		# Determine if the email is already claimed.
		email_user = env.db.query(User).filter_by(email = email).one_or_none()
		if not email_user:
			# The email isn't claimed yet, so assume they have it and try to register it.
			cmt.user = users.register_email(env.db, email)
		else:
			# It's a registered user's email.
			raise HTTPException(status_code = 401, detail = "That email belongs to a registered user." +
				" If it's you and you just claimed it, check your inbox for a registration link.")
	env.db.add(cmt)
	# Subscribe the user who posted it.
	if cmt.user and cmt.user.autosub:
		env.db.add(Subscription(user = cmt.user, comment = cmt))
	# For now, only sitewide new-article subscription is supported.
	if sub_site: cmt.user.sub_site = True
	env.db.commit()
	bg.add_task(send_reply_notifs, env.db, cmt)

class EditCommentParams(BaseModel):
	id: int
	name: str
	body: str
@router.put('/comments')
async def edit_comment(params: EditCommentParams, env = Depends(env)):
	cmt = env.db.query(Comment).get(params.id)
	require_login(env.user)
	if env.user != cmt.user and not env.user.admin:
		raise HTTPException(status_code = 403, detail = '')
	cmt.name = params.name
	cmt.body = params.body
	cmt.time_changed = datetime.datetime.now()
	cmt.validate()
	env.db.add(cmt)
	env.db.commit()

@router.delete('/comments')
async def delete_comment(req: Request, env = Depends(env)):
	id = int(await req.body())
	require_admin(env.user)
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
		# If we're at the top level, do article subs.
		if not comment.reply_to:
			for sub in db.query(ArticleSubscription).filter_by(path = comment.article_path).all():
				if sub.user not in ignoring: listening.add(sub.user)
			break
		# Else, get the parent comment.
		comment = db.query(Comment).get(comment.reply_to)
	# Email everybody.
	for user in listening:
		emails.send(util.SERVER_EMAIL, [user.email], "New reply on yujiri.xyz", REPLY_NOTIF_TXT.format(
			title = new_comment.article_title,
			name = new_comment.name,
			time = new_comment.time_added.strftime("%Y-%m-%d %R"),
			body = new_comment.body,
			link = 'https://yujiri.xyz' + new_comment.summary_dict()['link'],
		))
