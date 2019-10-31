#!/bin/sh
cd d:git/element.app
RAILS_ENV=production rails assets:precompile
rails s -e production