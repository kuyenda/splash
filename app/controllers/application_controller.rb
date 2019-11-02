class ApplicationController < ActionController::Base
  def home
    render 'layouts/home.html.erb'
  end
  def index
    render 'layouts/index'
  end
end
