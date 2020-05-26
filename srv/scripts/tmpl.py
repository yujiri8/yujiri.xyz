#!/usr/local/bin/python3.7
"""Processes a source file and writes the final output to the production file."""

import jinja2
import mistune
from slugify import slugify
import bs4
import os, sys, datetime, argparse, pwd

HOME = pwd.getpwuid(os.getuid()).pw_dir
SRCDIR = HOME+'/src/'
OUTDIR = HOME+'/html/'

jinja_env = jinja2.Environment(autoescape = True)

def process_file(infile, outfile, templates):
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
	# Generate the output before writing it, so we don't truncate the file.
	output = build_article(infile, templates, infile[len(SRCDIR):], get_last_modified(infile))
	# Write the output.
	with open(outfile, 'w', encoding='utf-8') as f: f.write(output)

def get_last_modified(*files):
	return datetime.datetime.utcfromtimestamp(max(os.path.getmtime(file) for file in files)).\
		replace(tzinfo = datetime.timezone.utc)

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

def build_article(filename, templates, path, last_modified):
	# Read the article first.
	with open(infile, encoding='utf-8') as f:
		article = f.read()
	# Right now, this is the only template.
	templatefile = templates + 'article.html'
	with open(templatefile, encoding='utf-8') as f:
		template_txt = f.read()
	args = parse_directives(article)
	# Retain only the article body.
	article = article[article.find('\n\n')+2:]
	if filename.endswith('.md'):
		article = mistune.markdown(article, escape=False) \
			.replace('<pre><code>', '<pre class="code">') \
			.replace('</code></pre>', '</pre>')
	args['ARTICLE'] = add_fragment_links(article)
	# Strip index and .html from the canonical URL.
	if path.endswith('.html'): path = path[:-5]
	elif path.endswith('.md'): path = path[:-3]
	if path.endswith('index'): path = path[:-5]
	args['PATH'] = path
	if not args.get('NO_TIMESTAMP'): args['TIMESTAMP'] = last_modified.isoformat()
	template = jinja_env.from_string(template_txt)
	return template.render(args)

def add_fragment_links(article):
	"""Finds each heading and adds a pilcrow that's a permalink to it."""
	dom = bs4.BeautifulSoup(article, features='lxml')
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

if __name__ == '__main__':
	parser = argparse.ArgumentParser()
	parser.add_argument('infiles', nargs = '*') # optional if -r is passed
	parser.add_argument('-o', dest = 'stdout', action = 'store_true')
	parser.add_argument('-t', dest = 'templatedir', default = HOME+'/src/srv/scripts/')
	parser.add_argument('-r', dest = 'recursive', action = 'store_true')
	args = parser.parse_args()
	if args.recursive:
		import glob
		args.infiles = (f for f in glob.glob(SRCDIR+'/**', recursive=True)
			if '/js/' not in f and '/srv/' not in f and '.gitignore' not in f)
	elif not len(args.infiles):
		print('if not generating everything, need at least one filename', file = sys.stderr)
		sys.exit(1)
	for arg in args.infiles:
		infile = os.path.abspath(arg)
		outfile = infile.replace(SRCDIR, OUTDIR)
		# strip .html or .md from the end, for Nginx's benefit
		if outfile.endswith('.html'): outfile = outfile[:-5]
		elif outfile.endswith('.md'): outfile = outfile[:-3]
		process_file(infile, args.stdout or outfile, args.templatedir)
