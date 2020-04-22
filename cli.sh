yarn add --modules-folder ./vendor/assets/components
# gem 'sassc-rails', '>= 2.1.0'
# gem 'bcrypt', '~> 3.1.7'

# 编译
RAILS_ENV=production bin/rails assets:precompile
rails assets:clean
rails assets:clobber
rails tmp:clear
rails log:clear

# 迁移
rails db:reset / rails db:drop db:setup
rails db:rollback
rails db:seed
bin/rails db:migrate
bin/rails db:migrate RAILS_ENV=test
bin/rails db:migrate RAILS_ENV=production

# 测试生产环境
rails db:drop DISABLE_DATABASE_ENVIRONMENT_CHECK=1 RAILS_ENV=production && rails db:migrate RAILS_ENV=production && RAILS_ENV=production rails db:seed
rails s -e production -p 3000

# 进入数据库的命令行界面
rails db
# 回滚最后一个迁移
bin/rails db:rollback
# 以非交互的方式在 Rails 中运行 Ruby 代码
rails runner
