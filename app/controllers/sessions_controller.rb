class SessionsController < ApplicationController
  # 空白布局, 仅加载静态文件
  layout "auth"
  def new
    # 记录之前访问的URL
    store_url_before_login
  end
  # 处理登录
  def create
    @user = User.find_by(email: params[:session][:email].downcase)
    if @user && @user.authenticate(params[:session][:password])
      log_in @user
      params[:session][:remember_me] == '1' ? remember(@user) : forget(@user)
      # 访问记录或者用户界面
      redirect_back_or @user
    else
      # 创建一个错误消息
      flash.now[:danger] = 'Invalid email/password combination'
      render :new
    end
  end
  def destroy
    log_out if logged_in?
    redirect_to root_url
  end
end
