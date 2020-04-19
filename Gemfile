source 'https://gems.ruby-china.com'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.3'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2.3'
# Use Puma as the app server
gem 'puma', '~> 3.11'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
gem 'duktape'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
gem 'bcrypt', '3.1.13'
# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'
# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development
# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false
#==============================================================================
#
#==============================================================================
# Create pretty URL’s and work with human-friendly strings
gem 'friendly_id', '~> 5.2.4'
# Easily generate fake data
gem 'ffaker'
# The simplest way to group by
gem 'groupdate'
# Pagination library for Rails
gem 'will_paginate', '~> 3.1.0'
# Color manipulation and palette generation
gem 'chroma'
# Classier solution for file uploads for Rails
gem 'carrierwave', '1.1.0'
gem 'mini_magick', '4.7.0'
gem 'fog-aws', '2.0.0'
gem 'nokogiri'
# Forms made easy for Rails! It's tied to a simple DSL, with no opinion on markup.
gem 'simple_form'
# Object-based searching
gem 'ransack'
#==============================================================================
# Assets adapter for rails
#==============================================================================
# gem 'bootstrap-sass', '~> 3.4.1'
gem 'bootstrap', '~> 4.3.1'
gem 'jquery-rails'
gem "font-awesome-rails"
# Editor
gem 'ace-rails-ap'
# Charts
gem "chartkick"

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  # Better error page for Rack apps
  gem "better_errors"
  gem "binding_of_caller"
  # Rails Database Viewer and SQL Query Runner
  gem 'rails_db', '2.3.0'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  gem 'rails-controller-testing'
end

group :production do
  gem 'pg', '0.20.0'
end


# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
