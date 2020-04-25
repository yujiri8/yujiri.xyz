# Dependencies

* SQLAlchemy
* FastAPI
* uvicorn
* nginx
* npm
* jinja2
* mistune v2
* python-slugify
* pgpy
* Beautiful Soup
* mutt (for email notifications)
* paladin
* entr
* certbot (only to get certs)

# Overview

* The host runs FreeBSD and is managed with SSH.

* The repository is installed as `~/src`.

* Nginx serves all static files - including articles - from an output dir, `~/html`.

* A Django backend manages comments, the Spem dictionary, and any other dynamic aspects.

* The frontend uses lit-element and webpack to bundle all JS components and dependenices into a single file.

* Articles are written as mostly just the article content, with a few template directives at the top. `srv/scripts/tmpl.py` reads a source file, processes it into a completed static file that Nginx can serve, and writes it to the output dir. Files like CSS and static resources are simply hard-linked to the output dir instead.

* `srv/scripts/monitor.sh` monitors the source dir for files being changed and automatically reruns the template script on them. It can't find files being added (or deleted) though, so in those cases, `monitor.sh` needs to be restarted.

* Currently, novel chapters are not templated. This is regrettable.

* **DNS**: a TXT record on @ of `v=spf1 a:yujiri.xyz ~all` is required to make email delivery work.

# Instructions

* `srv/scripts/install-cf.sh` installs the nginx and paladin configs.

* `srv/scripts/tmplall.sh` traverses the source dir, excluding dirs that shouldn't generate output files, and fills the entire output dir appropriately.

* From `srv/js/`, `npm run p` builds the JS and installs the bundle to the production dir automatically.

* `npm run d` builds the JS and installs it to the dev dir.

* `npx webpack` builds the JS without installing anywhere.

# Renew wildcard cert

As far as I know, there's no way to do it with cron because wildcard certs have to be manually regenerated.

`certbot -d yujiri.xyz,\*.yujiri.xyz --manual certonly`

Deploy the DNS TXT record and then the file as requested. Test that each are available before telling certbot to proceed.

# Django secret settings

The Django server's config involves some settings that can't be exposed in the repo, so they're stored in secret.py protected by .gitignore. The necessary settings:

* `SECRET_KEY`

# Markdown problem

I have several unresolved issues with markdown processing. I explore them and the things I've tried [at dev.to](https://dev.to/yujiri8/the-quest-for-a-better-markdown-processor-31og).
