yujiri.xyz is powered by a slightly customized [Didact](https://yujiri.xyz/didact) stored in its yujiri.xyz branch. It also has its own config files and `_scripts/install-cfg.sh` replaces Didact's configuration installer script, since the yujiri.xyz server hosts things other than the yujiri.xyz website.

# Renew wildcard cert

As far as I know, there's no way to do it with cron because wildcard certs have to be manually regenerated.

`certbot -d yujiri.xyz,\*.yujiri.xyz --manual certonly`

Deploy the DNS TXT record and then the file as requested. Test that each are available before telling certbot to proceed.

# DDLC mod downloads

The website hosts the [MC's Revenge](https://yujiri.xyz/works/mc_revenge/) and [Return To The Portrait](https://yujiri.xyz/works/return_to_the_portrait/) downloads, but the repository doesn't include them. The downloads should be placed in their folders under `works/`, where they're gitignored.
