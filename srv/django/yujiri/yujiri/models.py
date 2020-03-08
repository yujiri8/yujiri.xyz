from django.db import models
import django.contrib.postgres.fields as pg_fields
from django.utils import timezone
import django.core.exceptions as exceptions

import uuid, datetime, html

import markdown2

class Word(models.Model):
	word = models.CharField(max_length=30, primary_key=True)
	meaning = models.CharField(max_length=200)
	notes = models.TextField()
	translations = pg_fields.ArrayField(base_field=models.CharField(max_length=50))
	tags = pg_fields.ArrayField(base_field=models.CharField(max_length=50))
	time_added = models.DateTimeField(default=timezone.now)
	time_modified = models.DateTimeField(default=timezone.now)
	def __str__(self):
		return "%s, last modified %s, time_added %s" % (
			self.word,
			self.time_modified.strftime('%Y %b %d, %A, %R'),
			self.time_added.strftime('%Y %b %d, %A, %R'),
		)
	def dict(self, raw = False):
		return {
			'word': self.word,
			'meaning': self.meaning,
			'notes': markdown(self.notes) if not raw else self.notes,
			'translations': self.translations,
			'tags': self.tags,
			'time_modified': self.time_modified.strftime('%Y %b %d, %A, %R (UTC)'),
			'time_added': self.time_added.strftime('%Y %b %d, %A, %R (UTC)'),
		}
	def change(self, new):
		self.meaning = new.meaning
		self.notes = new.notes
		self.translations = new.translations
		self.tags = new.tags
		self.time_modified = timezone.now()

class User(models.Model):
	email = models.CharField(unique=True, max_length=100, null=True)
	name = models.CharField(unique=True, max_length=30, null=True)
	pubkey = models.BinaryField()
	password = models.TextField()
	auth = models.CharField(max_length=50)
	admin = models.BooleanField(default = False)
	def __str__(self):
		return self.email
	def subs(self):
		return list(Subscription.objects.filter(user = self, sub = True))
	def ignores(self):
		return list(Subscription.objects.filter(user = self, sub = False))

class Comment(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	time_posted = models.DateTimeField(default=timezone.now)
	time_changed = models.DateTimeField(null=True)
	name = models.CharField(max_length=30)
	reply_to = models.CharField(max_length=200)
	article_path = models.CharField(max_length=200)
	article_title = models.CharField(max_length=200)
	body = models.TextField()
	ip = models.CharField(max_length=15, null=True)
	user_agent = models.TextField(null=True)
	user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
	def __str__(self):
		txt = "%s on %s at %s" % (self.name, self.article_title, self.time_posted.strftime("%Y %b %d, %A, %R"))
		if self.time_changed != self.time_posted:
			txt += " (edited %s)" % (self.time_changed.strftime("%Y %b %d, %A, %R"),)
		return txt
	def dict(self, user, raw = False):
		cmt = {
			'id': str(self.id),
			'name': self.name,
			'reply_to': self.reply_to,
			'body': markdown(self.body) if not raw else self.body,
			'time_posted': self.time_posted.strftime('%Y %b %d, %A, %R (UTC)'),
			'has_replies': len(Comment.objects.filter(reply_to = str(self.id))),
		}
		if self.time_changed:
			cmt['time_changed'] = self.time_changed.strftime('%Y %b %d, %A, %R (UTC)')
		# If a user is provided, attach that user's sub status to the comment.
		if user:
			try:
				cmt['sub'] = Subscription.objects.get(comment = self, user = user).sub
			except exceptions.ObjectDoesNotExist:
				cmt['sub'] = None
		return cmt
	def summary_dict(self):
		return {
			'id': str(self.id),
			'name': self.name,
			'article_title': self.article_title,
			'link': self.article_path + '?c=' + str(self.id) + '#comment-section',
			'time_posted': self.time_posted.strftime('%Y %b %d, %A, %R'),
		}
	def validate(self):
		"""Validates the comment, and if invalid, returns a string explanation."""
		if not self.name:
			return "You need a name"
		if self.name.strip() != self.name:
			return "Your name mustn't have leading or trailing whitespace"
		if len(self.name) > 30:
			return "You cannot possibly need a name longer than 30 characters."

class Subscription(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
	sub = models.BooleanField()
	def __str__(self):
		if self.sub: return "%s subbed to %s" % (self.user, self.comment)
		else: return "%s ignoring %s" % (self.user, self.comment)
	def dict(self):
		return {
			'comment': self.comment.summary_dict(),
			'sub': self.sub,
		}

def markdown(text):
	"""Processes both markdown and the <spem> tag."""
	# unescape > so blockquotes and spoilers can work; stop bookmarklet links sneaking in via Markdown;
	# and fix the order of the tags in <pre><code> blocks.
	return markdown2.markdown(spemtag(html.escape(text, quote=False).replace('&gt;', '>')),
		extras=['code-friendly', 'spoiler', 'tables', 'fenced-code-blocks']) \
		.replace('<a href="javascript:', '') \
		.replace('<pre><code>', '<pre class="code">') \
		.replace('</code></pre>', '</pre>')

def spemtag(text):
	"""Unescapes only the <spem>tag</spem>, the only HTML tag allowed for direct use in comments.
	Expects > to be already unescaped; see markdown."""
	return text.replace('&lt;spem>', '<spem>').replace('&lt;/spem>', '</spem>')
