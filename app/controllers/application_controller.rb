class ApplicationController < ActionController::Base
  include SessionsHelper
  def home
    render 'application/index'
  end
  def css
    render 'application/css'
  end
  def debug
    redirect_back fallback_location: root_url
  end
end
