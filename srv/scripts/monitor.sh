#!/bin/sh
# This is used to monitor changes to the source dir and mirror them in production.

find /root/src/* -not -path '*/js/*' -not -path '*/srv/*' | /usr/local/bin/entr -a /root/src/srv/scripts/tmpl.py /_
