#!/usr/bin/env bash
##
# Set up node application inside docker container.
#
# Takes 2 arguments.
# * If one argument --local or a URL to download as main config.
# * If two arguments, the first is a flag and the second is a URL.
##

URL=''
LOCAL=''
args=("$@")
if [ $# -gt 0 ] && [ ${args[0]} == '--local' ]
  then LOCAL='--local'
fi
if [ $# -eq 1 ] && [ ${args[0]} != '--local' ]
  then URL=${args[0]}
elif [ $# -eq 2 ]
  then URL=${args[1]}
fi

if [ -n "$URL" ]; then
  curl $URL > /var/www/html/config/config.json
fi

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
grunt $LOCAL
