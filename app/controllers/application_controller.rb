class ApplicationController < ActionController::Base
  def home
    render 'layouts/home'
  end
  def index
    render 'layouts/index'
  end
end
