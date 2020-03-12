import subprocess
from django.core.mail.backends.base import BaseEmailBackend

class MuttBackend(BaseEmailBackend):
	def send_messages(self, email_messages):
		for m in email_messages:
			self.send(m)
	def send(self, message):
		mutt = subprocess.Popen(args = ['/usr/local/bin/mutt', *message.to,
			'-s', message.subject,
			'-e', f'set from="{message.from_email}"'],
			stdin = subprocess.PIPE)
		mutt.stdin.write(bytes(message.body, 'utf-8'))
		mutt.stdin.close()
