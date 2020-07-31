from fastapi import APIRouter, HTTPException, Response, Request, Body, Depends
from starlette.responses import RedirectResponse
from pydantic import BaseModel

import pgpy

import re, secrets, hashlib, urllib.parse, json
from typing import Any

from db import User, Comment, Subscription, ArticleSubscription
from common import env, require_login, COOKIE_LIFETIME
from email_templates import *
import emails, util

router = APIRouter()

class LoginParams(BaseModel):
	email: str
	pw: bytes
@router.post('/login')
async def login(params: LoginParams, response: Response, env = Depends(env)):
	"""All logging in happens at this endpoint."""
	user = env.db.query(User).filter_by(pw = hash_pw(params.pw)).first()
	if not params.pw or not user:
		raise HTTPException(status_code = 401, detail = 'Invalid credentials.')
	# Successful login. Give them a cookie.
	return grant_auth(response, user)

def gen_auth_token(): return secrets.token_urlsafe(32)

def hash_pw(pw): return hashlib.sha512(pw).hexdigest()

def grant_auth(resp, user):
	"""Takes an HttpResponse and a user and sets the auth and email cookies on it."""
	# They last a month.
	resp.set_cookie('auth', user.auth, secure = True, max_age = COOKIE_LIFETIME)
	if user.name:
		resp.set_cookie('name', user.name, secure = True, max_age = COOKIE_LIFETIME)
	else:
		resp.set_cookie('name', '', max_age = 0)
	resp.set_cookie('email', urllib.parse.quote(user.email), secure = True, max_age = COOKIE_LIFETIME)
	if user.key:
		k = pgpy.PGPKey()
		k.parse(user.key)
		resp.set_cookie('key', urllib.parse.quote(k.fingerprint),
			secure = True,  max_age = COOKIE_LIFETIME)
	else:
		resp.set_cookie('key', '', max_age = 0)
	if user.admin:
		resp.set_cookie('admin', 'true', secure = True, max_age = COOKIE_LIFETIME)
	else:
		resp.set_cookie('admin', '', max_age = 0)
	# Apparently when you return a Response (as opposed to asking for it just to call set_cookie),
	# its status_code is None and that's a problem.
	if not resp.status_code:
		resp.status_code = 200
	return resp

@router.post('/users/claim')
async def claim_email(req: Request, env = Depends(env)):
	"""A wrapper around register_email that turns it into a valid endpoint handler."""
	register_email(env.db, (await req.body()).decode('utf8'))

def register_email(db, email):
	"""A helper to validate an email, create the user, and send a confirm email.
	Returns the created user if successful."""
	if not re.fullmatch(r"[^@]+@[\w]+\.[\w]+", email):
		raise HTTPException(status_code = 400, detail = "That doesn't look like a valid email address.")
	# First, check whether the email is already registered.
	user = db.query(User).filter_by(email = email).one_or_none()
	if not user:
		# This is expected. If they're making a new account, it shouldn't exist.
		user = User(email = email, auth = gen_auth_token())
		send_confirm_email(user)
		db.add(user)
		db.commit()
	else:
		# It does exist. They're asking to claim a registered email. Just send the confirmation.
		send_confirm_email(user)
	return user

def send_confirm_email(user):
	msg = SUB_CONFIRM_MSG_TXT.format(email = user.email, token = user.auth)
	emails.send(util.SERVER_EMAIL, [user.email], "Subscribing you to reply notifications on yujiri.xyz",
		msg, key = user.key)

@router.get('/users/prove')
async def prove_email(token, env = Depends(env)):
	user = env.db.query(User).filter_by(auth = token).one_or_none()
	if not user:
		raise HTTPException(status_code = 400, detail = "Looks like a bad authentication token.")
	# Might as well change the token.
	user.auth = gen_auth_token()
	env.db.add(user)
	env.db.commit()
	resp = RedirectResponse('/notifs', status_code = 303)
	return grant_auth(resp, user)

@router.get('/users/notifs')
async def see_subs(path: str = '', env = Depends(env)):
	require_login(env.user)
	if path: # For checking if you're subscribed to an article.
		if path.endswith('/index'): path = path[:-5]
		return env.user.article_subs.filter_by(path = path).one_or_none()
	return {
		'comment_subs': [sub.dict() for sub in env.user.comment_subs],
		'article_subs': [sub.dict() for sub in env.user.article_subs],
		'autosub': env.user.autosub,
		'site': env.user.sub_site,
	}

@router.put('/users/notifs')
async def edit_subs(state = Body(None), id = Body(None), path = Body(''), env = Depends(env)):
	# TODO maybe this should use DELETE for removing a sub.
	require_login(env.user)
	# Comment subscription.
	if id:
		env.user.comment_subs.filter_by(comment_id = id).delete()
		if state is not None:
			env.db.add(Subscription(user = env.user, comment_id = id, sub = bool(state)))
	# Article subscription.
	else:
		try:
			title = util.get_article_title(path)
		except FileNotFoundError:
			raise HTTPException(status_code = 404, detail = "No such article")
		if path.endswith('/index'): path = path[:-5]
		env.user.article_subs.filter_by(path = path).delete()
		if state:
			env.db.add(ArticleSubscription(user = env.user, path = path, title = title))
	env.db.commit()

@router.put('/users/setpw')
async def setpw(req: Request, resp: Response, env = Depends(env)):
	require_login(env.user)
	env.user.pw = hash_pw(await req.body())
	# Change the token after this.
	env.user.auth = gen_auth_token()
	env.db.commit()
	return grant_auth(resp, env.user)

@router.put('/users/setname')
async def setname(req: Request, resp: Response, env = Depends(env)):
	require_login(env.user)
	# To avoid the uniqueness constraint, empty usernames must be internally None, not '',
	# but are converted to '' for the client.
	env.user.name = (await req.body()).decode('utf8') or None
	env.db.commit()
	if env.user.name:
		resp.set_cookie('name', env.user.name, secure = True, max_age = COOKIE_LIFETIME)
	else:
		resp.set_cookie('name', '', max_age = 0)

@router.put('/users/setkey')
async def setkey(req: Request, resp: Response, env = Depends(env)):
	require_login(env.user)
	# Make sure it's a valid key before we accept it.
	try:
		file = (await req.body()).decode('utf8')
		k = pgpy.PGPKey()
		k.parse(file)
	except ValueError as e:
		raise HTTPException(status_code = 400, detail = "Invalid key. You need an ASCII-armored PGP key.")
	env.user.key = file
	# Change the token after this.
	env.user.auth = gen_auth_token()
	env.db.commit()
	return grant_auth(resp, env.user)

@router.put('/users/setautosub')
async def setautosub(req: Request, env = Depends(env)):
	require_login(env.user)
	env.user.autosub = json.loads(await req.body())
	env.db.commit()

@router.put('/users/notifs/site')
async def setsubsite(state = Body(True), env = Depends(env)):
	require_login(env.user)
	env.user.sub_site = state
	env.db.commit()
