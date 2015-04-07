#!/usr/bin/env bash

# Manually active ruby193.
export PATH="/opt/rh/ruby193/root/usr/bin:${PATH}"
export PKG_CONFIG_PATH="/opt/rh/ruby193/root/usr/lib64/pkgconfig"
export LD_LIBRARY_PATH="/opt/rh/ruby193/root/usr/lib64"
export MANPATH="/opt/rh/ruby193/root/usr/share/man:"

cd $NODE_APP_DIR

echo "==> Install Bundler"
gem install bundler

echo "==> Installing bower"
npm install bower -g

echo "==> Installing npm dependencies"
npm install --unsafe-perm

echo "==> Build embed assets and run tests"
grunt

grunt watch
