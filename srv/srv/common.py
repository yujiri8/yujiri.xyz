from fastapi import Request, Cookie, HTTPException

from db import Session, User

class Env:
	def __init__(self, db, user):
		self.db = db
		self.user = user

async def env(auth = Cookie('')):
	db = Session()
	try:
		# get the user
		user = db.query(User).filter_by(auth = auth).one_or_none()
		yield Env(db, user)
	finally:
		db.close()

# a month
COOKIE_LIFETIME = 2592000

def require_admin(user):
	if not user:
		raise HTTPException(status = 401)
	if not user.admin:
		raise HTTPException(status = 403)
