class ApplicationController < ActionController::Base
  include SessionsHelper
  def home
    render 'application/index'
  end
  def css
    render 'application/css'
  end
  def debug
    render html: "<strong>Not Found</strong>".html_safe , layout: false
  end
end
