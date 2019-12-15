class ApplicationController < ActionController::Base
  include SessionsHelper
  def home
    render 'layouts/index'
  end
  def style_page
    render 'common/style_page'
  end
end
