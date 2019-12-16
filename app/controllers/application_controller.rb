class ApplicationController < ActionController::Base
  include SessionsHelper
  def home
    render 'application/index'
  end
  def style
    render 'application/style'
  end
end
