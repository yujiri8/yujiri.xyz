#!/bin/sh

dir=~/src/srv/cf

ln -f $dir/paladin.conf /usr/local/etc/
ln -f $dir/nginx/nginx.conf /usr/local/etc/nginx/
ln -f $dir/nginx/redirect-map.conf /usr/local/etc/nginx/
ln -sf $dir/nginx/sites /usr/local/etc/nginx/sites
