"""A test to make sure deletes cascade correctly."""

import db
from db import User, Comment, Subscription

db.connect('test')

class TestFailed(Exception): pass

def setup(make_reply = False):
	"""Clear the DB, then add a user, a comment by them, and subscribe them to it."""
	db.resetdb()
	s = db.Session()
	try:
		u = User(email = 'user@example.com', auth = '')
		c = Comment(user = u, name = '', body = '', article_path = '', article_title = '', reply_to = None)
		b = Subscription(user = u, comment = c)
		s.add(u)
		s.add(c)
		s.add(b)
		s.commit()
		if make_reply:
			c2 = Comment(user = u, name = '', body = '', article_path = '', article_title = '', reply_to = c.id)
			s.add(c2)
			s.commit()
	finally:
		s.close()

def delete_comment_orm():
	"""Delete the comment using Session.delete so it happens at the ORM level."""
	setup()
	s = db.Session()
	try:
		s.query(User).one()
		c = s.query(Comment).one()
		s.query(Subscription).one()
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
	setup()
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

def delete_child_comment_orm():
	"""Delete a comment that's a reply at the ORM level."""
	setup(make_reply = True)
	s = db.Session()
	try:
		c = s.query(Comment).filter(Comment.reply_to != None).one()
		s.delete(c)
		s.commit()
		# It should work, but not delete the parent.
		require(s.query(Comment).one_or_none())
	finally:
		s.close()

def delete_child_comment_db():
	"""Delete a comment that's a reply at the database level."""
	setup(make_reply = True)
	s = db.Session()
	try:
		s.query(Comment).filter(Comment.reply_to != None).delete()
		s.commit()
		# It should work, but not delete the parent.
		require(s.query(Comment).one_or_none())
	finally:
		s.close()


def require(cond, msg = ''):
	if not cond:
		raise TestFailed(msg)

delete_comment_orm()
delete_comment_db()
delete_child_comment_orm()
delete_child_comment_db()
