from fastapi import APIRouter, HTTPException, Header, Body, Response, Request, Depends, BackgroundTasks
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from sqlalchemy.sql.functions import func

from typing import List
from functools import reduce

from db import Word
from common import env, require_admin
import util

router = APIRouter()

@router.get('/spem/words')
async def get_words(
	word = '',
	meaning = '',
	translation = '',
	tags: list = [],
	notes = '',
	notes_regex = '',
	raw: bool = False,
	env = Depends(env),
):
	# Build filters.
	filters = []
	if word:
		filters.append(Word.word.in_(word.split(' ')))
	for m in meaning.split(' '):
		filters.append(Word.meaning.op('~')("\\m" + m + "\\y"))
	if translation:
		filters.append(Word.translations.any(translation))
	if tags:
		filters.append(Word.tags.contains(tags))
	if notes:
		filters.append(func.lower(Word.notes).contains(notes.lower()))
	if notes_regex:
		filters.append(Word.notes_regex.op('~')(notes_regex))
	# Search.
	filter = reduce(lambda x, y: x & y, filters)
	words = env.db.query(Word).filter(filter)
	return [word.dict(raw) for word in words]

class WordParams(BaseModel):
	word: str
	meaning: str
	translations: List[str]
	tags: List[str]
	notes: str

def validate(word):
	word.word = word.word.strip()
	word.meaning = word.meaning.strip()
	word.translations = [t.strip() for t in word.translations]
	word.tags = [t.strip() for t in word.tags]
	word.notes = word.notes.strip()

@router.get('/spem/tags')
async def get_tags(env = Depends(env)):
	tags = set()
	for word in env.db.query(Word).all():
		for tag in word.tags:
			tags.add(tag)
	return sorted(tags)

@router.post('/spem/words')
async def add_word(params: WordParams, env = Depends(env)):
	require_admin(env.user)
	validate(params)
	already = env.db.query(Word).filter_by(word = params.word).one_or_none()
	if already:
		raise HTTPException(status_code = 400, detail = "There's already a word called that.")
	env.db.add(Word(
		word = params.word,
		meaning = params.meaning,
		translations = params.translations,
		tags = params.tags,
		notes = params.notes,
	))
	env.db.commit()

@router.put('/spem/words')
async def change_word(params: WordParams, env = Depends(env)):
	require_admin(env.user)
	validate(params)
	word = env.db.query(Word).filter_by(word = params.word).one()
	word.change(params)
	env.db.commit()

@router.delete('/spem/words')
async def delete_word(req: Request, env = Depends(env)):
	require_admin(env.user)
	word = env.db.query(Word).filter_by(word = (await req.body()).decode('utf-8')).one()
	env.db.delete(word)
	env.db.commit()
