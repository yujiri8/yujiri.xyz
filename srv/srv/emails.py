import pgpy

import subprocess

def send(from_addr, to_addr, subject, body, key = None):
	mutt = subprocess.Popen(args = ['/usr/local/bin/mutt', *to_addr,
		'-s', subject,
		'-e', f'set from="{from_addr}"'],
		stdin = subprocess.PIPE)
	if key:
		k = pgpy.PGPKey()
		k.parse(key)
		body = str(k.encrypt(pgpy.PGPMessage.new(body)))
	mutt.stdin.write(bytes(body, 'utf8'))
	mutt.stdin.close()
