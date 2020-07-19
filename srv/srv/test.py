"""A test to make sure deletes cascade correctly."""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import db
from db import User, Comment, Subscription

db.connect('test')

class TestFailed(Exception): pass

def setup():
	"""Clear the DB, then add a user, a comment by them, and subscribe them to it."""
	db.resetdb()
	s = db.Session()
	try:
		u = User(email = 'user@example.com', auth = '')
		c = Comment(user = u, name = '', body = '', article_path = '', article_title = '', reply_to = '')
		b = Subscription(user = u, comment = c)
		s.add(u)
		s.add(c)
		s.add(b)
		s.commit()
	finally:
		s.close()

def delete_comment_orm():
	"""Delete the comment using Session.delete so it happens at the ORM level."""
	s = db.Session()
	try:
		u = s.query(User).one()
		c = s.query(Comment).one()
		b = s.query(Subscription).one()
		s.delete(c)
		s.commit()
		# The User should be the only thing left.
		require(s.query(User).one_or_none())
		require(not s.query(Comment).one_or_none())
		require(not s.query(Comment).one_or_none())
	finally:
		s.close()

def delete_comment_db():
	"""Delete the column using Query.delete so it happens at the database level."""
	s = db.Session()
	try:
		c = s.query(Comment).one()
		s.query(Comment).filter_by(id = c.id).delete()
		s.commit()
		# The User should be the only thing left.
		require(s.query(User).one_or_none())
		require(not s.query(Comment).one_or_none())
		require(not s.query(Comment).one_or_none())
	finally:
		s.close()

def require(cond, msg = ''):
	if not cond:
		raise TestFailed(msg)

setup()
delete_comment_orm()
setup()
delete_comment_db()
