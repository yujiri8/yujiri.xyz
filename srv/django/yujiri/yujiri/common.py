import django.core.exceptions as exceptions
from .models import User

import os.path

root = "/root/src/"

def get_article_title(path):
	"""Gets the title of an article from its path."""
	if path.endswith('/'):
		path += 'index'
	with open(root + path + '.html', encoding='utf-8') as f:
		for line in f:
			if line.startswith("TITLE "):
				return line[6:-1]

def article_exists(path):
	if path.endswith('/'):
		path += 'index'
	if os.path.exists(root + path + '.html'):
		return True

# TODO ideally this function should raise an exception.
def check_auth(req):
	"""A helper to check authentication."""
	auth = req.COOKIES.get('auth')
	try:
		return User.objects.get(auth = auth)
	except exceptions.ObjectDoesNotExist:
		return None
