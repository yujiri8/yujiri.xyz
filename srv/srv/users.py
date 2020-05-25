from fastapi import APIRouter, HTTPException, Cookie, Header, Response, Request, Depends, File
from fastapi.responses import HTMLResponse
from starlette.responses import RedirectResponse
from pydantic import BaseModel

import pgpy

import re, datetime, secrets, hashlib, urllib.parse, json
from typing import Any

from db import User, Comment, Subscription
from common import env, COOKIE_LIFETIME
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
async def see_subs(env = Depends(env)):
	if not env.user:
		raise HTTPException(status_code = 401)
	resp = {
		'subs':	[sub.dict() for sub in env.user.subs],
		'autosub': env.user.autosub,
	}
	return resp

class EditSubsParams(BaseModel):
	id: int
	state: Any
@router.put('/users/notifs')
async def edit_subs(params: EditSubsParams, env = Depends(env)):
	if not env.user:
		raise HTTPException(status_code = 401)
	cmt = env.db.query(Comment).get(params.id)
	if params.state is None:
		env.db.query(Subscription).filter_by(user = env.user, comment = cmt).delete()
		return
	# Avoid creating duplicates.
	sub = env.user.subs.filter_by(comment = cmt).one_or_none()
	if not sub:
		sub = Subscription(user = env.user, comment = cmt)
		env.db.add(sub)
	sub.sub = bool(params.state)
	env.db.commit()

@router.put('/users/setpw')
async def setpw(req: Request, resp: Response, env = Depends(env)):
	if not env.user: raise HTTPException(status_code = 401)
	env.user.pw = hash_pw(await req.body())
	# Change the token after this.
	env.user.auth = gen_auth_token()
	env.db.commit()
	return grant_auth(resp, env.user)

@router.put('/users/setname')
async def setname(req: Request, resp: Response, env = Depends(env)):
	if not env.user: raise HTTPException(status_code = 401)
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
	if not env.user: raise HTTPException(status_code = 401)
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
	if not env.user: raise HTTPException(status_code = 401)
	env.user.autosub = json.loads(await req.body())
	env.db.commit()
