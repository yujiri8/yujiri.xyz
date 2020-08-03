import traceback, datetime

SUB_CONFIRM_MSG_TXT = """You asked to modify notification settings for {email} on yujiri.xyz, right? This email is being sent incase it wasn't you. If it was, please visit https://yujiri.xyz/api/users/prove?token={token} to confirm your changes and log in."""

REPLY_NOTIF_TXT = """
A reply has been posted to a comment thread you're subscribed to.

On {time}, {name} posted on {title}:

{body}


------

Direct link to the comment: {link}.

To edit your subscriptions, visit https://yujiri.xyz/notifs.

Don't reply by email. That doesn't work.
"""

def ERROR_TXT(exc):
	timestamp = datetime.datetime.now().strftime('%Y-%m-%d %R')
	msg = ''.join(traceback.format_exception(type(exc), exc, exc.__traceback__))
	return ERROR_TXT_TMPL % (timestamp, msg)

ERROR_TXT_TMPL = """
Error at %s

%s
"""
