from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404
import django.core.exceptions as exceptions

import json, re, secrets, base64, hashlib, subprocess, uuid, urllib.parse

from . import common
from .models import Comment, User, Subscription, markdown

SUB_CONFIRM_MSG_TXT = """You asked to modify notification settings for %s on yujiri.xyz, right? This email is being sent incase it wasn't you. If it was, please visit https://yujiri.xyz/api/notifs/prove?token=%s to confirm your changes and obtain an auth token that will be remembered by your browser so you won't have to do this regularly."""
REPLY_NOTIF_TXT = """
A reply has been posted to a comment thread you're subscribed to.

On %s, %s posted on %s:

%s


------

To edit your subscriptions, visit https://yujiri.xyz/notifs.

Don't reply by email. That doesn't work yet.
"""

def comment_router(req):
	if req.method == "POST":
		return accept_comment(req)
	if req.method == "PUT":
		return edit_comment(req)
	if req.method == "DELETE":
		return delete_comment(req)
	else:
		return get_comments(req)

def get_comments(req):
	user = common.check_auth(req) # Authentication is optional here.
	reply_to = req.GET.get('reply_to')
	id = req.GET.get('id')
	raw = req.GET.get('raw')
	# Case 1: all comments replying to something.
	if reply_to:
		# Don't get messed up by polynymous index pages.
		if reply_to.endswith('/index'):
			reply_to = reply_to[:-5]
		comments = Comment.objects.filter(reply_to = reply_to).order_by('-time')
		return JsonResponse([c.dict(user = user, raw = raw) for c in comments], safe = False)
	# Case 2: a specific comment requested.
	elif id:
		comment = get_object_or_404(Comment, id = id)
		return JsonResponse(comment.dict(user = user, raw = raw))
	else:
		return HttpResponse(status = 400)

def recent_comments(req):
	count = req.GET.get('count') or 10
	comments = Comment.objects.order_by('-time')[:int(count)]
	return JsonResponse([comment.summary_dict() for comment in comments], safe = False)

def accept_comment(req):
	reply_to = req.GET.get('reply_to')
	email = req.GET.get('email')
	name = req.GET.get('name')
	if not reply_to:
		return HttpResponse(status = 400)
	# If it's a reply, get the article path from the parent comment.
	if '/' not in reply_to:
		article_path = Comment.objects.get(id = reply_to).article_path
	# Otherwise, make sure it exists.
	else:
		if not common.article_exists(reply_to):
			return HttpResponse("That article doesn't seem to exist.", status = 404)
		# Temporary: No commenting on 404
		if reply_to == '/404':
			return HttpResponse("You can't comment on that URL", status = 400)
		# Strip 'index'.
		if reply_to.endswith('/index'): reply_to = reply_to[:-5]
		article_path = reply_to
	cmt = Comment(
		name = name,
		reply_to = reply_to,
		body = req.body.decode('utf-8'),
		article_path = article_path,
		article_title = common.get_article_title(article_path),
		ip = req.META.get('REMOTE_ADDR'),
		user_agent = req.META.get('HTTP_USER_AGENT'),
	)
	err = cmt.validate()
	if err: return HttpResponse(err, status = 400)
	# Prevent impersonation.
	elif name == 'Yujiri':
		user = common.check_auth(req)
		if not user or user.name != 'Yujiri': return HttpResponse(status = 401)
	# Check for an email.
	subscribe = clear_auth = False
	if email:
		# Determine if the email is already claimed.
		try:
			claimed_user = User.objects.get(email = email)
		except exceptions.ObjectDoesNotExist:
			# The email isn't claimed yet, so assume they have it and try to register it.
			user, err = register_email(email)
			if err: return err
			# Subscribe them at the end.
			subscribe = True
			# also clear their auth token, so they don't remain logged in as the old user.
			clear_auth = True
		else:
			# The email exists. Check that this is them.
			user = common.check_auth(req)
			if user != claimed_user:
				return HttpResponse(status = 401)
			# It's them. Subscribe them at the end.
			subscribe = True
	# Everthing looks valid; post it.
	cmt.save()
	send_reply_notifs(cmt)
	if subscribe:
		Subscription(user = user, comment = cmt, sub = True).save()
	resp = HttpResponse(status = 204)
	if clear_auth:
		resp.set_cookie('auth', '', max_age=0)
		resp.set_cookie('email', '', max_age=0)
		resp.set_cookie('haskey', '', max_age=0)
	return resp

def edit_comment(req):
	user = common.check_auth(req)
	# currently only available to me, but people might eventually be able to edit their own comments.
	if not user or user.name != 'Yujiri':
		return HttpResponse(status = 401)
	body = json.loads(req.body)
	cmt = get_object_or_404(Comment, id = body['id'])
	cmt.name = body['name']
	cmt.body = body['body']
	err = cmt.validate()
	if err: return HttpResponse(err, status = 400)
	cmt.save()
	return HttpResponse(status = 204)

def delete_comment(req):
	user = common.check_auth(req)
	if not user or user.name != 'Yujiri':
		return HttpResponse(status = 401)
	try:
		id = uuid.UUID(req.body.decode('utf-8'))
	except:
		return HttpResponse(status = 400)
	get_object_or_404(Comment, id = id).delete()
	return HttpResponse(status = 204)

def preview_comment(req):
	return HttpResponse(markdown(req.body.decode('utf-8')))

def claim_email(req):
	"""A thin wrapper around register_email that turns it into a valid endpoint handler."""
	_, err = register_email(req.body.decode('utf-8'))
	if err: return err
	return HttpResponse(status = 204)

def register_email(email):
	"""A helper to validate an email, create the user, and send a confirm email.
	Returns an HTTP response if it fails; None if it succeeds."""
	if not re.fullmatch(r"[^@]+@[\w]+\.[\w]+", email):
		return None, HttpResponse("That doesn't look like a valid email address.", status = 400)
	# First, check whether the email is already registered.
	try:
		user = User.objects.get(email = email)
	except exceptions.ObjectDoesNotExist:
		# This is expected. If they're making a new account, it shouldn't exist.
		user = User(email = email, auth = gen_auth_token())
		user.save()
		send_confirm_email(user)
	else:
		# It does exist. They're asking to claim a registered email. Just send the confirmation.
		send_confirm_email(user)
	return user, None

def send_confirm_email(user):
	mutt = subprocess.Popen(args = ['/usr/local/bin/mutt', user.email,
		'-s', "Subscribing you to reply notifications on yujiri.xyz",
		'-e', 'set from="yujiri.xyz notifications <notifications@yujiri.xyz>"'],
		stdin = subprocess.PIPE)
	mutt.stdin.write(bytes(SUB_CONFIRM_MSG_TXT % (user.email, user.auth), "utf-8"))
	mutt.stdin.close()

def prove_email(req):
	token = req.GET.get('token')
	try:
		user = User.objects.get(auth = token)
	except exceptions.ObjectDoesNotExist:
		return HttpResponse("Looks like a bad authentication token.", status = 400)
	# Might as well change the token.
	user.auth = gen_auth_token()
	user.save()
	resp = HttpResponseRedirect('/notifs')
	return grant_auth(resp, user)

def edit_subs(req):
	user = common.check_auth(req)
	if not user: return HttpResponse(status = 401)
	body = json.loads(req.body.decode('utf-8'))
	# Get the comment.
	cmt = get_object_or_404(Comment, id=body.get('id'))
	# Ensure the desired state is a valid one. (None means delete it.)
	if body.get('state') not in (True, False, None):
		return HttpResponse(status = 400)
	# Edit the subscription.
	if body.get('state') is None:
		get_object_or_404(Subscription, user = user, comment = cmt).delete()
	else:
		# Avoid creating duplicates.
		try:
			sub = Subscription.objects.get(user = user, comment = cmt)
			sub.sub = body.get('state')
		except exceptions.ObjectDoesNotExist:
			sub = Subscription(user = user, comment = cmt, sub = body.get('state'))
		sub.save()
	return HttpResponse(status = 204)

def see_subs(req):
	user = common.check_auth(req)
	if not user: return HttpResponse(status = 401)
	subs = Subscription.objects.filter(user = user)
	resp = JsonResponse({
		'subs':	[sub.dict() for sub in subs],
		'email': user.email,
	})
	return resp

def send_reply_notifs(orig_comment):
	listening = set()
	ignoring = set()
	# If it's a comment by a registered user, don't email them about their own comment.
	try:
		user = User.objects.get(name = orig_comment.name)
		ignoring.add(user)
	except exceptions.ObjectDoesNotExist:
		pass
	# Travel up the tree, finding the lowest-level subscription or ignore for each user.
	comment = orig_comment
	while True:
		subs = Subscription.objects.filter(comment__id = comment.id)
		for sub in subs:
			# If it's a sub and not overridden by a more specific ignore.
			if sub.sub and sub.user not in ignoring:
				listening.add(sub.user)
			# If it's an ignore and not overridden by a more specific sub.
			elif sub.user not in listening:
				ignoring.add(sub.user)
		# Finish if we're at the top level.
		if '/' in comment.reply_to: break
		# Else, get the parent comment.
		comment = Comment.objects.get(id = comment.reply_to)
	# Email everybody.
	mutt = subprocess.Popen(args = ['/usr/local/bin/mutt', *(user.email for user in listening),
		"-s", "New reply on yujiri.xyz",
		'-e', 'set from="yujiri.xyz notifications <notifications@yujiri.xyz>"'],
		stdin = subprocess.PIPE)
	mutt.stdin.write(bytes(REPLY_NOTIF_TXT % (
		orig_comment.article_title,
		orig_comment.name,
		orig_comment.time.strftime("%b %d, %A, %R (UTC)"),
		orig_comment.body,
	), "utf8"))
	mutt.stdin.close()

def login(req):
	"""All logging in happens at this endpoint."""
	# Decode credentials.
	try:
		body = json.loads(req.body)
		email, pw = body['email'], body['pw'].encode('utf8')
	except:
		return HttpResponse(status = 400)
	# Verify credentials.
	try:
		assert pw # Stop empty passwords incase the user hasn't set one.
		user = User.objects.get(email = email, password = hash_pw(pw))
	except (AssertionError, exceptions.ObjectDoesNotExist):
		return HttpResponse(status = 401)
	# Successful login. Give them a cookie.
	resp = HttpResponse(status = 204)
	return grant_auth(resp, user)

def setpw(req):
	user = common.check_auth(req)
	if not user: return HttpResponse(status = 401)
	# Save pw.
	user.password = hash_pw(req.body)
	# Change the token after this.
	user.auth = gen_auth_token()
	user.save()
	resp = HttpResponse(status = 204)
	return grant_auth(resp, user)

def setusername(req):
	user = common.check_auth(req)
	if not user: return HttpResponse(status = 401)
	# Save username.
	user.name = req.body.decode('utf-8')
	# Change the token after this.
	user.auth = gen_auth_token()
	user.save()
	resp = HttpResponse(status = 204)
	return grant_auth(resp, user)

def setpubkey(req):
	user = common.check_auth(req)
	if not user: return HttpResponse(status = 401)
	key = req.FILES['key']
	user.pubkey = key.read()
	print(user.pubkey)
	# Change the token after this.
	user.auth = gen_auth_token()
	user.save()
	resp = HttpResponse(status = 204)
	return grant_auth(resp, user)

def gen_auth_token(): return secrets.token_urlsafe(32)

def hash_pw(pw): return hashlib.sha512(pw).hexdigest()

def grant_auth(resp, user):
	"""Takes an HttpResponse and a token and sets the auth and email cookies on it."""
	# They last a month.
	resp.set_cookie('auth', user.auth, secure=True, samesite='lax', max_age=2592000)
	resp.set_cookie('email', urllib.parse.quote(user.email), secure=True, samesite='lax', max_age=2592000)
	resp.set_cookie('haskey', bool(user.pubkey), secure=True, samesite='lax', max_age=2592000)
	# Set the admin cookie also if it's me.
	if user.name == 'Yujiri': resp.set_cookie('admin', 'true', max_age=2592000)
	return resp
