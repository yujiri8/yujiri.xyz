#!/usr/local/bin/python3.7
"""Processes a source file and writes the final output to the production file."""

import markdown2, jinja2
from bs4 import BeautifulSoup as bs
import os, sys, datetime

SRCDIR = '/root/src/'
OUTDIR = '/root/html/'
TEMPLATES = '/root/src/srv/scripts/'

# Need a custom Markdown object to add header ids.
markdowner = markdown2.Markdown(extras = ['header-ids'])
markdowner.reset()

class YujiriMarkdowner(markdown2.Markdown):
	pass
#	_block_tags_a = 'expand-note|' + markdown2.Markdown._block_tags_a
#	_block_tags_b = 'expand-note|' + markdown2.Markdown._block_tags_b
yujiri_markdown = YujiriMarkdowner(extras = ['code-friendly', 'fenced-code-blocks', 'markdown-in-html']).convert

jinja_env = jinja2.Environment(autoescape = True)

def process_file(infile, outfile, templates):
	print(infile, outfile, templates)
	# If it's a directory, create it if it doesn't exist, then quit.
	if os.path.isdir(infile):
		if not os.path.exists(outfile): os.mkdir(outfile)
		return
	# If it's not a templated article, just hard-link it if it isn't already.
	if not infile.endswith('.html') or ('/chapter' in infile and 'works/' in infile):
		# Have to remove it first if it exists but it's a different file.
		if os.path.exists(outfile) and not os.path.samefile(infile, outfile):
			os.remove(outfile)
		if not os.path.exists(outfile):
			os.link(infile, outfile)
		return
	# Read the article first.
	with open(infile, encoding='utf-8') as f:
		article = f.read()
	# Right now, this is the only template.
	templatefile = templates + 'article.html'
	with open(templatefile, encoding='utf-8') as f:
		template = f.read()
	# Generate the output before writing it, so we don't truncate the file.
	output = build_article(article, template, infile[len(SRCDIR):], get_last_modified(infile))
	# Write the output.
	with open(outfile, 'w', encoding='utf-8') as f: f.write(output)

def get_last_modified(*files):
	return datetime.datetime.utcfromtimestamp(max(os.path.getmtime(file) for file in files))

def parse_directives(article):
	"""Processes the template directives at the top of a source file."""
	args = {'JS': [], 'CSS': []}
	for line in article.split('\n'):
		if line == '':
			# End of header.
			break
		parts = line.split(' ')
		if len(parts) == 1:
			args[parts[0]] = True
		elif parts[0] in ('CSS', 'JS'):
			args[parts[0]].append(' '.join(parts[1:]))
		# A few shortcuts.
		elif parts[0] == "TEMPLATE":
			args['JS'].append('/bundle.js')
			args['CSS'].append('/global.css')
			if parts[1] == 'COLUMNS':
				args['ONLOAD'] = args['ONRESIZE'] = 'resizeColumns()'
		else:
			args[parts[0]] = ' '.join(parts[1:])

	return args

def build_article(article, template_txt, path, last_modified):
	args = parse_directives(article)
	# Retain only the article body.
	article = article[article.find('\n\n')+2:]
	if args.get('MARKDOWN'):
		article = yujiri_markdown(article) \
			.replace('<pre><code>', '<pre class="code">') \
			.replace('</code></pre>', '</pre>')
	args['ARTICLE'] = add_fragment_links(article)
	# Strip index and .html from the canonical URL.
	if path.endswith('.html'): path = path[:-5]
	if path.endswith('index'): path = path[:-5]
	args['PATH'] = path
	if not args.get('NO_TIMESTAMP'): args['TIMESTAMP'] = last_modified.strftime('%Y %b %d, %A, %R')
	template = jinja_env.from_string(template_txt)
	return template.render(args)

def add_fragment_links(article):
	"""Finds each heading and adds a pilcrow that's a permalink to it."""
	dom = bs(article, features='lxml')
	for elem in dom.findAll(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
		# Compute the id if it doesn't have one set.
		if 'id' not in elem:
			elem['id'] = markdowner.header_id_from_text(''.join(elem.strings), '', 0)
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

if __name__ == '__main__':
	try:
		infile = sys.argv[1]
	except:
		print(sys.argv, ": invalid arguments. We need at least an infile; "
			"optionally an outfile, and a template dir.")
		sys.exit(1)
	infile = os.path.abspath(infile)
	try:
		outfile = sys.argv[2]
	except:
		outfile = infile.replace(SRCDIR, OUTDIR)
		# strip '.html' from the end, for Nginx's benefit
		if outfile.endswith('.html'): outfile = outfile[:-5]
	try:
		TEMPLATES = sys.argv[3]
	except: pass
	process_file(infile, outfile, TEMPLATES)
