class ApplicationController < ActionController::Base
  def home
    render 'layouts/home'
  end
  def index
    render 'layouts/index'
  end
  def test
    render 'layouts/test'
  end
end
