class ApplicationController < ActionController::Base
  include SessionsHelper
  def home
    @show_footer = true
    render 'application/index'
  end
  def css
    render 'application/css'
  end
  def debug
    redirect_back fallback_location: root_url
  end
  private
  # 确保用户已登录
  def logged_in_user
    unless logged_in?
      flash[:danger] = "Please log in."
      store_url_before_login(request.url)
      # 跳转登录
      redirect_to login_url
    end
  end
end
