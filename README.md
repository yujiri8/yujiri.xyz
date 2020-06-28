# Overview

* The host runs FreeBSD and is managed with SSH.

* The repository is installed as `~/src`.

* Nginx serves all static files - including articles - from an output dir, `~/html`.

* A FastAPI/SQLAlchemy backend manages comments, the Spem dictionary, and any other dynamic aspects.

* The frontend uses lit-element and webpack to bundle all JS components and dependenices into a single file.

* Articles are written in either markdown or HTML, as just the article content with a few template directives at the top. `srv/scripts/tmpl.py` reads a source file, processes it into a completed static file that Nginx can serve, and writes it to the output dir. Files like CSS and images are simply hard-linked to the output dir.

* `srv/scripts/monitor.sh` monitors the source dir for files being changed and automatically reruns the template script on them. It can't find files being added (or deleted) though, so in those cases, `monitor.sh` needs to be restarted.

* **DNS**: a TXT record on @ of `v=spf1 a:yujiri.xyz ~all` is required to make email delivery work.

* Unrelated to the website, the server also runs a Tor node.

# Instructions

`srv/scripts/install1.sh` does the first half of the setup. The certificate must be deployed before running `srv/scripts/install2.sh`.

Individual commands for development and maintenance:

* `srv/scripts/install-cfg.sh` installs nginx and paladin configs.

* `srv/scripts/tmpl.py -r` traverses the source dir and fills the entire output dir appropriately.

* From `srv/js/`, `npm run p` builds the JS and installs the bundle to the production dir.

* `npm run d` builds the JS and installs it to the dev dir.

* `npx webpack` builds the JS without installing anywhere.

# Renew wildcard cert

As far as I know, there's no way to do it with cron because wildcard certs have to be manually regenerated.

`certbot -d yujiri.xyz,\*.yujiri.xyz --manual certonly`

Deploy the DNS TXT record and then the file as requested. Test that each are available before telling certbot to proceed.

# DDLC mod downloads

The website hosts the [MC's Revenge](https://yujiri.xyz/works/mc_revenge/) and [Return To The Portrait](https://yujiri.xyz/works/return_to_the_portrait/) downloads, but the repository doesn't include them. The downloads should be placed in their folders under `works/`, where they're gitignored.

# Dev subdomain

`dev.yujiri.xyz` is set up by installing a separate copy of the repository in `~/dev`. Nginx's config serves the dev subdomain from `~/devhtml`. The command to run the dev API server:

`python3.7 ~/dev/srv/srv/main.py --db dev --socket /tmp/uvicon-dev.sock`

# Markdown problems

I have several unresolved issues with markdown processing. I explore them and the things I've tried [at dev.to](https://dev.to/yujiri8/the-quest-for-a-better-markdown-processor-31og).
