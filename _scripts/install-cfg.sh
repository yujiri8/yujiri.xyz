#!/bin/sh

dir=~/didact/content/_scripts/cfg

ln -f $dir/paladin.conf /usr/local/etc/
ln -f $dir/nginx/nginx.conf /usr/local/etc/nginx/
ln -f $dir/nginx/redirect-map.conf /usr/local/etc/nginx/
ln -sf $dir/nginx/sites /usr/local/etc/nginx/
ln -f $dir/torrc /usr/local/etc/tor/
ln -f $dir/yggdrasil.conf /usr/local/etc/
