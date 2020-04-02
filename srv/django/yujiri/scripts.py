#! /usr/local/bin/python3.7 -i

import os, django
os.environ['DJANGO_SETTINGS_MODULE'] = 'yujiri.settings'
django.setup()

from yujiri.models import *
from yujiri import common

def delete_tag(old):
	for word in Word.objects.filter(tags__contains = [old]):
		if input(word.word + "," + str(word.tags)) == 'n': continue
		try: word.tags.remove(old)
		except: pass
		word.save()

def rename_tag(old, new):
	for word in Word.objects.filter(tags__contains = [old]):
		if input(word.word + "," + str(word.tags)) == 'n': continue
		word.tags.remove(old)
		word.tags.append(new)
		word.save()

def relocate_article(old, new):
	for cmt in Comment.objects.filter(article_path = old):
		if input(cmt.summary_dict()) == 'n': continue
		cmt.article_path = new
		if cmt.reply_to == old: cmt.reply_to = new
		cmt.save()

def update_article_names():
	for cmt in Comment.objects.all():
		newtitle = common.get_article_title(cmt.article_path)
		if newtitle == cmt.article_title:
			continue
		input(cmt.article_title + ' renamed to ' + newtitle)
		cmt.article_title = newtitle
		cmt.save()

def mistune_migrate():
	import re
	for cmt in Comment.objects.all():
		new = re.sub(r'\*\*\*(.+)\*\*\*', '**_\1_**', cmt.body)
		if new != cmt.body and not input(new + '\n\n'):
			cmt.body = new
			cmt.save()

def slurp_logs():
	import json, datetime, os
	with open('/var/log/nginx/access.log') as f:
		for line in f:
			if not line or line == '\n': continue
			try:
				args = json.loads(line)
			except:
				print(line)
				raise
			time = datetime.datetime.strptime(args['time'], '%d/%b/%Y:%H:%M:%S +0000').replace(
				tzinfo = datetime.timezone.utc)
			Log(
				method = args['method'],
				scheme = args['scheme'],
				http2 = args['http2'],
				host = args['host'],
				path = args['uri'],
				query = args['query'],
				orig_path = args.get('request_uri'),
				time = time,
				duration = datetime.timedelta(microseconds = args['duration']*1000),
				code = args['code'],
				ip = args['ip'],
				ua = args['user_agent'],
				referer = args['referer'],
			).save()
#	os.truncate('/var/log/nginx/access.log', 0)
