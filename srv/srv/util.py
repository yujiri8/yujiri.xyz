import mistune
import pygments, pygments.lexers, pygments.formatters

import os, pwd, html

# Note this code is duplicated in tmpl.py.
class HighlightRenderer(mistune.HTMLRenderer):
	def block_code(self, code, lang = None):
		if lang:
			try:
				lexer = pygments.lexers.get_lexer_by_name(lang)
				formatter = pygments.formatters.HtmlFormatter(linenos = False, cssclass="pygments")
				return pygments.highlight(code, lexer, formatter)
			except pygments.util.ClassNotFound: pass
		return '<pre class="code">' + html.escape(code) + '</pre>'
markdowner = mistune.create_markdown(renderer = HighlightRenderer(escape = True), plugins = ['strikethrough'])

def markdown(text):
	"""Processes both markdown and the <spem> tag."""
	return spemtag(markdowner(text))

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
