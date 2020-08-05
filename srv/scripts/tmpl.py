#!/usr/local/bin/python3.7
"""Processes a source file and writes the final output to the production file."""

import jinja2
import mistune
from slugify import slugify
import pygments, pygments.lexers, pygments.formatters
import bs4
import os, sys, datetime, argparse, pwd, html

# Note this code is duplicated on the server.
class HighlightRenderer(mistune.HTMLRenderer):
	def block_code(self, code, lang = None):
		if lang:
			lexer = pygments.lexers.get_lexer_by_name(lang)
			formatter = pygments.formatters.HtmlFormatter(linenos = False, cssclass="pygments")
			return pygments.highlight(code, lexer, formatter)
		return '<pre class="code">' + html.escape(code) + '</pre>'
markdown = mistune.create_markdown(renderer = HighlightRenderer(escape = False), plugins = ['strikethrough'])

HOME = pwd.getpwuid(os.getuid()).pw_dir
SRCDIR = HOME+'/src/'
OUTDIR = HOME+'/html/'
TEMPLATEDIR = '/srv/scripts/'

jinja_env = jinja2.Environment(autoescape = True)

def process_file(srcdir, infile, outfile):
	print(infile, outfile)
	# If it's a directory, create it if it doesn't exist, then quit.
	if os.path.isdir(infile):
		if not os.path.exists(outfile): os.mkdir(outfile)
		return
	# If it's not a templated article, just hard-link it if it isn't already.
	if not infile.endswith('.html') and not infile.endswith('.md') or ('/chapter' in infile and 'works/' in infile):
		# Have to remove it first if it exists but it's a different file.
		if os.path.exists(outfile) and not os.path.samefile(infile, outfile):
			os.remove(outfile)
		if not os.path.exists(outfile):
			os.link(infile, outfile)
		return
	# Generate the output before writing it, so we don't truncate the file until we're ready to write.
	output = build_article(infile, srcdir)
	with open(outfile, 'w', encoding='utf-8') as f: f.write(output)

def parse_directives(article):
	"""Processes the template directives at the top of a source file."""
	args = {'JS': [], 'CSS': []}
	for line in article.split('\n'):
		if line == '':
			# End of header.
			break
		directive, _, param = line.partition(' ')
		if not param:
			args[directive] = True
		elif directive in ('CSS', 'JS'):
			args[directive].append(param)
		# A few shortcuts.
		elif directive == "TEMPLATE":
			args['JS'].append('/bundle.js')
			args['CSS'].append('/global.css')
			if param == 'COLUMNS':
				args['ONLOAD'] = args['ONRESIZE'] = 'resizeColumns()'
		else:
			args[directive] = param
	return args

def build_article(filename, srcdir):
	# Read the article first.
	with open(filename, encoding='utf-8') as f:
		article = f.read()
	# Right now, this is the only template.
	templatefile = srcdir + '/srv/scripts/article.html'
	with open(templatefile, encoding='utf-8') as f:
		template_txt = f.read()
	args = parse_directives(article)
	# Retain only the article body.
	article = article[article.find('\n\n')+2:]
	if filename.endswith('.md'):
		article = markdown(article)
	args['ARTICLE'] = add_fragment_links(article)
	if not args.get('NO_TIMESTAMP'):
		args['TIMESTAMP'] =	datetime.datetime.utcfromtimestamp(os.path.getmtime(filename)) \
			.replace(tzinfo = datetime.timezone.utc)
	# Strip index and .html from the canonical URL.
	if filename.endswith('.html'): filename = filename[:-5]
	elif filename.endswith('.md'): filename = filename[:-3]
	if filename.endswith('/index'): filename = filename[:-6]
	args['PATH'] = filename[len(srcdir):]
	args['NAV'] = navbar_html(args['PATH'], args.get('NAV'))
	template = jinja_env.from_string(template_txt)
	return template.render(args)

def add_fragment_links(article):
	"""Finds each heading and adds a pilcrow that's a permalink to it."""
	dom = bs4.BeautifulSoup(article, features='html.parser')
	for elem in dom.findAll(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
		# Compute the id if it doesn't have one set.
		if 'id' not in elem:
			elem['id'] = slugify(''.join(elem.strings))
		# Add the link.
		link = dom.new_tag('a')
		link['href'] = '#' + elem['id']
		link['class'] = 'sectionlink'
		link.string = '¶'
		# Insert the link at the end of the heading.
		elem.append(link)
	# Make sure we don't include extra <html>, <head> or <body>.
	for elem in dom.findAll(['html', 'body', 'head']):
		elem.unwrap()
	return dom

def navbar_html(path, nav_directive):
	parts = path.split('/')
	# Root page is a special case.
	exceptions = {
		'fiction': 'Storytelling',
		'mc_revenge': "MC's Revenge",
		'': 'yujiri.xyz',
	}
	navhtml = ''
	running_path = ''
	for part in parts[:-1]:
		# Poems don't have their own index.
		if part == 'poems': continue
		# Exception for DDLC mods.
		if part == 'ddlc_mods':
			navhtml += f'<a class="yujiri-link" href="{running_path}ddlc">DDLC mods</a> &gt; '
			running_path += part + '/'
			continue
		display_name = exceptions.get(part) or part.replace('_', ' ').title()
		running_path += part + '/'
		navhtml += f'<a class="yujiri-link" href="{running_path}">{display_name}</a> &gt; '
	return navhtml + (nav_directive or exceptions.get(parts[-1]) or parts[-1].replace('_', ' ').title())

if __name__ == '__main__':
	parser = argparse.ArgumentParser()
	parser.add_argument('infiles', nargs = '*') # ignored if -r is passed
	parser.add_argument('-o', dest = 'stdout', action = 'store_true')
	parser.add_argument('-r', dest = 'recursive', action = 'store_true')
	parser.add_argument('-s', dest = 'srcdir', default = SRCDIR)
	parser.add_argument('-d', dest = 'outdir', default = OUTDIR)
	args = parser.parse_args()
	# Normalize dir names to end in one slash. I can't use * because it will match twice.
	args.srcdir = os.path.abspath(args.srcdir)
	args.outdir = os.path.abspath(args.outdir)
	if args.recursive:
		import glob
		args.infiles = (f for f in glob.glob(args.srcdir+'/**', recursive=True)
			if '/js/' not in f and '/srv/' not in f and '.gitignore' not in f)
	elif not args.infiles:
		print('if not generating everything, need at least one filename', file = sys.stderr)
		sys.exit(1)
	for arg in args.infiles:
		infile = os.path.abspath(arg)
		outfile = infile.replace(args.srcdir, args.outdir)
		# Strip .html or .md from the end, for Nginx's benefit.
		if outfile.endswith('.html'): outfile = outfile[:-5]
		elif outfile.endswith('.md'): outfile = outfile[:-3]
		process_file(args.srcdir, infile, args.stdout or outfile)
