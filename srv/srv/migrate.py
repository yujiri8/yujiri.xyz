# Plan: get the data from Django as JSON, then pump it back in here.

import json, datetime
from db import *

def get_spem():
	with open('../django/yujiri/spem.json') as f:
		words = json.load(f)
	s = Session()
	for word in words:
		s.add(Word(
			word = word['word'],
			meaning = word['meaning'],
			translations = word['translations'],
			tags = word['tags'],
			notes = word['notes'],
			time_added = datetime.datetime.fromisoformat(word['time_added']),
			time_changed = datetime.datetime.fromisoformat(word['time_modified']),
		))
	s.commit()
	s.close()

def get_users():
	s = Session()
	global user_id_map, cmt_id_map
	user_id_map = {}
	with open('../django/yujiri/users.json') as f:
		for user in json.load(f):
			u = User(
				name = user['name'],
				email = user['email'],
				key = user['pubkey'],
				auth = user['auth'],
				pw = user['password'],
				admin = user['admin'],
				autosub = user['autosub'],
			)
			s.add(u)
			s.flush()
			user_id_map[user['id']] = u.id
	cmt_id_map = {}
	with open('../django/yujiri/cmt.json') as f:
		cmts = json.load(f)
	for cmt in cmts:
		reply_to = cmt['reply_to']
		new_cmt = Comment(
			name = cmt['name'],
			body = cmt['body'],
			user_id = user_id_map.get(cmt['user_id']),
			reply_to = reply_to,
			ip = cmt['ip'],
			ua = cmt['ua'],
			article_path = cmt['article_path'],
			article_title = cmt['article_title'],
			time_added = datetime.datetime.fromisoformat(cmt['time_added']),
			time_changed = datetime.datetime.fromisoformat(cmt['time_changed'])
				if cmt['time_changed'] else None,
		)
		s.add(new_cmt)
		s.flush()
		cmt_id_map[cmt['id']] = new_cmt.id
	for cmt in s.query(Comment).all():
		if '/' not in cmt.reply_to:
			cmt.reply_to = cmt_id_map[cmt.reply_to]
	# now subs
	with open('../django/yujiri/subs.json') as f:
		for sub in json.load(f):
			s.add(Subscription(user_id = user_id_map[sub['user']], comment_id = cmt_id_map[sub['cmt']]))
	s.commit()
	s.close()
