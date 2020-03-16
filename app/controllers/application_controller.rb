class ApplicationController < ActionController::Base
  layout false, only: [:static, :help]

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
  def static
    render 'application/static/hero'
  end
  def help
    render 'application/sketch_guides/n_01'
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
