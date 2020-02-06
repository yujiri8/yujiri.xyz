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

def strip_html_suffix():
	for cmt in Comment.objects.all():
		if not cmt.article_path.endswith('.html'):
			assert not cmt.reply_to.endswith('.html')
			continue
		# with .html going away, index should go too.
		if cmt.article_path.endswith('index.html'):
			newpath = cmt.article_path[:-10]
		else:
			newpath = cmt.article_path[:-5]
		print(cmt.article_path, newpath)
		if cmt.article_path == cmt.reply_to:
			cmt.reply_to = newpath
		cmt.article_path = newpath
		print(cmt.article_path + ' changed to ' + newpath)
		cmt.save()

breakpoint()
