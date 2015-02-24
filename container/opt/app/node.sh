#!/bin/bash

cd /var/www/html

echo "==> Enable Ruby 1.9.3 and RubyGems"
. /opt/rh/ruby193/enable

echo "==> Install Bundler"
gem install bundler

echo "==> Installing bower"
npm install bower -g

echo "==> Installing npm dependencies"
npm install --unsafe-perm

echo "==> Build embed assets and run tests"
grunt release

# This functions to keep the container alive as well as rebuilding assets.
echo "==> Running grunt watch"
grunt watch
