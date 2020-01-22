class SessionsController < ApplicationController
  layout "auth", only: [:new, :create]
  def new
  end
  # 处理登录
  def create
    @user = User.find_by(email: params[:session][:email].downcase)
    if @user && @user.authenticate(params[:session][:password])
      log_in @user
      params[:session][:remember_me] == '1' ? remember(@user) : forget(@user)
      redirect_to @user
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
