yarn add --modules-folder ./vendor/assets/components
# gem 'sassc-rails', '>= 2.1.0'
# gem 'bcrypt', '~> 3.1.7'

# 编译
RAILS_ENV=production bin/rails assets:precompile
rails assets:clean
rails assets:clobber
rails tmp:clear

# 迁移
rails db:reset / rails db:drop db:setup
rails db:rollback
rails db:seed
bin/rails db:migrate
bin/rails db:migrate RAILS_ENV=test
bin/rails db:migrate RAILS_ENV=production

# 测试生产环境
rails s -e production -p 3000
