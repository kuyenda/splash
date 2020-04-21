class ApplicationController < ActionController::Base
  # layout false, only: [:bar]
  include SessionsHelper

  def app
    @show_footer = true # app.html.erb
  end
  def bar
    # render :app
    # render "app"
    # render template: "pages/example", layout:false
    # render file: "C:/Users/hp/Desktop/1.rb"
    #### 以下方法不渲染视图，所以也没有布局
    # render inline: '<h1>Hye!</h1>'
    # render plain: "OK"
    # render html: "<strong>Not Found</strong>".html_safe
    # render json: (1..9).map{rand(5)}.to_json
    # render js: "alert('Hello Rails');"
    # render body: "raw"
    #### 选项
    #### :content_type :layout :location :status :formats
    # redirect_back fallback_location: root_url
  end
  def box
    render html: "".html_safe
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
