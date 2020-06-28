#!/bin/sh
set -e

pkg install -y nginx npm postgresql12-server postgresql12-client paladin entr mutt tor py37-pip
pip install certbot mistune==2.0.0a4 jinja2 beautifulsoup4 python-slugify sqlalchemy psycopg2 alembic fastapi uvicorn pgpy
~/src/srv/scripts/tmpl.py -r
~/src/srv/scripts/install-cfg.sh
cd ~/src/js
npm install
npm run p

echo "Part 1 finished. Deploy certificates and then run install2.sh."
