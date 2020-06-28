#!/bin/sh
set -e

service nginx enable
service nginx start
service postgresql enable
service postgresql initdb
service postgresql start
psql -U postgres 'CREATE DATABASE sqlalchemy'
python3.7 ~/src/srv/srv/db.py sqlalchemy create
service paladin enable
service paladin start
service tor enable
service tor start
