#!/bin/bash

cd /var/www/html

echo "==> Install Ruby >= 1.9.2 and RubyGems"
rpm -ev ruby
gpg2 --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
curl -L get.rvm.io | bash -s stable
source /etc/profile.d/rvm.sh
rvm install 1.9.3
cd /tmp
wget http://production.cf.rubygems.org/rubygems/rubygems-2.4.5.tgz
tar xfvz rubygems-2.4.5.tgz
cd rubygems-2.4.5
ruby setup.rb

cd /var/www/html

echo "==> Install Bundler"
gem install bundler

echo "==> Installing bower"
npm install bower -g

echo "==> Installing npm dependencies"
npm install --unsafe-perm

echo "==> Build embed assets and run tests"
grunt

# This functions to keep the container alive as well as rebuilding assets.
echo "==> Running grunt watch"
grunt watch
