#!/bin/sh
# This is used to rebuild all pages, if the monitor wasn't running.

srcdir=~/src

find $srcdir/* -not -path '*/js/*' -not -path '*/srv/*' -exec $srcdir/srv/scripts/tmpl.py '{}' \;

