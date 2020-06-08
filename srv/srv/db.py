from sqlalchemy import create_engine, Column, ForeignKey, Integer, String, DateTime, Boolean, ARRAY
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

import datetime

import util

Base = declarative_base()

def connect(dbname):
	global db, Session
	# TODO ideally return these instead of using a global ref.
	db = create_engine(f'postgres://localhost/?user=postgres&database={dbname}')
	Session = sessionmaker(bind = db)

class ModelError(ValueError): pass

class User(Base):
	__tablename__ = 'users'
	id = Column(Integer, primary_key = True)
	email = Column(String, unique = True)
	name = Column(String, unique = True)
	key = Column(String)
	pw = Column(String)
	auth = Column(String, nullable = False)
	admin = Column(Boolean, default = False, nullable = False)
	autosub = Column(Boolean, default = True, nullable = False)
	# related objects
	comments = relationship('Comment', back_populates = 'user', lazy = 'dynamic', passive_deletes = 'all')
	subs = relationship('Subscription', back_populates = 'user', lazy = 'dynamic', passive_deletes = 'all')
	def __repr__(self):
		return self.email

class Comment(Base):
	__tablename__ = 'comments'
	id = Column(Integer, primary_key = True)
	time_added = Column(DateTime, nullable = False, default = datetime.datetime.now)
	time_changed = Column(DateTime)
	name = Column(String, nullable = False)
	reply_to = Column(String, nullable = False)
	# These fields are stored for the sake of /recent_comments performance.
	article_path = Column(String, nullable = False)
	article_title = Column(String, nullable = False)
	body = Column(String, nullable = False)
	ip = Column(String)
	ua = Column(String)
	# related objects
	user_id = Column(Integer, ForeignKey('users.id', ondelete = 'set null'))
	user = relationship('User', back_populates = 'comments')
	subs = relationship('Subscription', back_populates = 'comment', lazy = 'dynamic', passive_deletes = 'all')
	def __repr__(self):
		txt = f"{self.name} on {self.article_title} at {self.time_added.strftime('%Y %b %d, %A, %R (UTC)')}"
		if self.time_changed:
			txt += f" (edited {self.time_changed.strftime('%Y %b %d, %A, %R')})"
		return txt
	def dict(self, session, user = None, raw = False, recursion = 5):
		cmt = {
			'id': str(self.id),
			'name': self.name,
			'reply_to': self.reply_to,
			'body': util.markdown(self.body) if not raw else self.body,
			'time_added': self.time_added.isoformat(),
		}
		if self.user and self.user.admin:
			cmt['admin'] = True
		if self.time_changed:
			cmt['time_changed'] = self.time_changed.isoformat()
		# If a user is provided, attach that user's sub status and ownership flag to the comment.
		if user:
			sub = self.subs.filter_by(user = user).one_or_none()
			if sub: cmt['sub'] = sub.sub
			else: cmt['sub'] = None
			cmt['owned'] = user == self.user
		# Load at most `recursion` levels deep.
		if recursion:
			cmt['replies'] = [c.dict(session, user, raw, recursion - 1) for c in
				session.query(Comment).filter_by(reply_to = str(self.id)).
				order_by(Comment.time_added.desc()).all()]
		else:
			# If we aren't loading them, just send the count of how many are left.
			cmt['replies'] = session.query(Comment).filter_by(reply_to = str(self.id)).count()
		return cmt
	def summary_dict(self):
		return {
			'id': str(self.id),
			'name': self.name,
			'article_title': self.article_title,
			'link': f"{self.article_path}?c={self.id}#comment-section",
			'time_added': self.time_added.isoformat(),
		}
	def validate(self):
		"""Validates the comment, and if invalid, returns a string explanation."""
		if not self.name:
			raise ModelError("You need a name")
		if self.name.strip() != self.name:
			raise ModelError("Your name mustn't have leading or trailing whitespace")
		if len(self.name) > 30:
			raise ModelError("You cannot possibly need a name longer than 30 characters.")

class Subscription(Base):
	__tablename__ = 'subs'
	id = Column(Integer, primary_key = True)
	comment_id = Column(Integer, ForeignKey('comments.id', ondelete = 'cascade'), nullable = False)
	user_id = Column(Integer, ForeignKey('users.id', ondelete = 'cascade'), nullable = False)
	user = relationship('User', back_populates = 'subs')
	comment = relationship('Comment', back_populates = 'subs')
	sub = Column(Boolean, nullable = False, default = True)
	def __repr__(self):
		if self.sub: return f"{self.user} subbed to {self.comment}"
		else: return f"{self.user} ignoring {self.comment}"
	def dict(self):
		return {
			'comment': self.comment.summary_dict(),
			'sub': self.sub,
		}

class Word(Base):
	__tablename__ = 'words'
	id = Column(Integer, primary_key = True)
	word = Column(String, unique = True, nullable = False)
	meaning = Column(String, nullable = False)
	notes = Column(String, nullable = False)
	translations = Column(ARRAY(String), nullable = False)
	tags = Column(ARRAY(String), nullable = False)
	time_added = Column(DateTime, nullable = False, default = datetime.datetime.now)
	time_changed = Column(DateTime, nullable = False, default = datetime.datetime.now)
	def __repr__(self):
		return f"{self.word}, last changed {self.time_changed}, time_added {self.time_added}"
	def dict(self, raw = False):
		return {
			'word': self.word,
			'meaning': self.meaning,
			'notes': util.markdown(self.notes) if not raw else self.notes,
			'translations': self.translations,
			'tags': self.tags,
			'time_changed': self.time_changed.isoformat(),
			'time_added': self.time_added.isoformat(),
		}
	def validate(self):
		self.word = self.word.strip()
		self.meaning = self.meaning.strip()
		self.translations = [t.strip() for t in self.translations if t.strip()]
		self.tags = [t.strip() for t in self.tags if t.strip()]
		self.notes = self.notes.strip()
		if not self.word:
			raise ModelError("Word can't be empty")
		if not self.meaning:
			raise ModelError("Meaning can't be empty")

class Log(Base):
	__tablename__ = 'logs'
	id = Column(String, nullable = False, primary_key = True)
	# The URL
	method = Column(String, nullable = False)
	scheme = Column(String, nullable = False)
	http2 = Column(String, nullable = False)
	host = Column(String, nullable = False)
	orig_path = Column(String)
	query = Column(String, nullable = False)
	# Response
	path = Column(String, nullable = False)
	time = Column(DateTime, nullable = False)
	duration = Column(Integer, nullable = False)
	code = Column(Integer, nullable = False)
	# Analytics
	ip = Column(String, nullable = False)
	ua = Column(String, nullable = False)
	referer = Column(String, nullable = False)

def createdb():
	Base.metadata.create_all(db)
def resetdb():
	Base.metadata.drop_all(db)
	createdb()
