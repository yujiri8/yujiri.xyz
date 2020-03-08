from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.db.models import Q
from django.shortcuts import get_object_or_404
import django.core.exceptions as exceptions

import json
from functools import reduce

from . import common
from .models import Word

def words_router(req):
	if req.method == 'GET':
		return get_words(req)
	# The other methods require admin status.
	user = common.check_auth(req)
	if not user or user.admin:
		return HttpResponse(status = 401)
	if req.method == 'POST':
		return add_word(req)
	if req.method == 'PUT':
		return change_word(req)
	if req.method == 'DELETE':
		return delete_word(req)

def get_words(req):
	words = req.GET.get('word')
	meaning = req.GET.get('meaning', '')
	translation = req.GET.get('translation')
	tags = req.GET.getlist('tag', [])
	notes = req.GET.get('notes')
	notes_regex = req.GET.get('notes_regex')
	no_markdown = req.GET.get('no_markdown') == 'true'
	filters = set()
	# Build filters.
	if words:
		filters.add(Q(word__in = words.split(' ')))
	for m in meaning.split(' '):
		filters.add(Q(meaning__regex = "\\m" + m + "\\y"))
	if translation:
		filters.add(Q(translations__contains = [translation]))
	if tags:
		filters.add(Q(tags__contains = tags))
	if notes:
		filters.add(Q(notes__icontains = notes))
	if notes_regex:
		filters.add(Q(notes__regex = notes_regex))
	# Search.
	filter = reduce(lambda x, y: x & y, filters)
	words = Word.objects.filter(filter).order_by('-time_modified')
	return JsonResponse([word.dict(no_markdown) for word in words], safe = False)

def get_tags(req):
	words = Word.objects.filter()
	tags = set()
	for word in words:
		for tag in word.tags:
			tags.add(tag)
	return JsonResponse(sorted(tags), safe = False)

def add_word(req):
	try:
		word = parse_word(json.loads(req.body.decode('utf-8')))
	except (AssertionError, KeyError, TypeError):
		return HttpResponse(status = 400)
	if Word.objects.filter(word=word.word):
		return HttpResponse("There's already a word called that.", status = 400)
	word.save()
	return HttpResponse(status = 204)

def change_word(req):
	try:
		input_word = parse_word(json.loads(req.body.decode('utf-8')))
	except (AssertionError, KeyError, TypeError):
		return HttpResponse(status = 400)
	word = get_object_or_404(Word, word = input_word.word)
	word.change(input_word)
	word.save()
	return HttpResponse(status = 204)

def delete_word(req):
	word = get_object_or_404(Word, word=req.body.decode('utf-8'))
	word.delete()
	return HttpResponse(status = 204)

def parse_word(word):
	# Don't allow empty fields.
	assert word['word'] and word['meaning'] and all(word['translations']) and all(word['tags'])
	return Word(
		word = word['word'].strip(),
		meaning = word['meaning'].strip(),
		translations = [t.strip() for t in word['translations']],
		tags = [t.strip() for t in word['tags']],
		notes = word.get('notes', '').strip(), # Notes are allowed to be empty.
	)
