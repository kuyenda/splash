class ApplicationController < ActionController::Base
  include SessionsHelper
  def home
    render 'application/index'
  end
  def css
    render 'application/css'
  end
end
