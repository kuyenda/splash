class SessionsController < ApplicationController
  layout "content"
  def new
    # 记录之前访问的URL
    store_url_before_login
  end
  # 处理登录
  def create
    @user = User.find_by(email: params[:session][:email].downcase)
    respond_to do |format|
      if @user && @user.authenticate(params[:session][:password])
        log_in @user
        params[:session][:remember_me] == '1' ? remember(@user) : forget(@user)
        # 访问记录或者用户界面
        format.html { redirect_back_or @user }
        format.json { render json: @user, status: :created, location: @user }
        format.js
      else
        # 创建一个错误消息
        @errors = {}
        @errors[:email] = "邮箱不存在" if @user.nil?
        @errors[:password] = "密码错误" if @user && !@user.authenticate(params[:session][:password])
        flash[:danger] = "账号密码错误"
        format.html { render action: 'new' }
        format.json { render json: @errors }
        format.js
      end
    end

  end
  def destroy
    log_out if logged_in?
    redirect_to root_url
  end
end
