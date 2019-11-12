class ApplicationController < ActionController::Base
  def home
    render 'layouts/index'
  end
  def style_page
    render 'common/style_page'
  end
  def script_page
    render 'common/script_page'
  end
end
