import mistune

import os, pwd

def markdown(text):
	"""Processes both markdown and the <spem> tag."""
	return spemtag(mistune.markdown(text, plugins = ['strikethrough']))

def spemtag(text):
	"""Unescapes only the <spem>tag</spem>, the only HTML tag allowed for direct use in comments."""
	return text.replace('&lt;spem&gt;', '<spem>').replace('&lt;/spem&gt;', '</spem>')

ROOT = pwd.getpwuid(os.getuid()).pw_dir + "/src/"
SERVER_EMAIL = 'yujiri.xyz notifications <notifications@yujiri.xyz>'

def get_article_title(path):
	"""Gets the title of an article from its path."""
	if path.endswith('/'):
		path += 'index'
	if os.path.exists(ROOT + path + '.md'):
		path += '.md'
	else:
		path += '.html'
	with open(ROOT + path, encoding='utf-8') as f:
		for line in f:
			if line.startswith("TITLE "):
				return line[6:-1]

def article_exists(path):
	if path.endswith('/'):
		path += 'index'
	if os.path.exists(ROOT + path + '.html') or os.path.exists(ROOT + path + '.md'):
		return True
