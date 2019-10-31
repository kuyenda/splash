class ApplicationController < ActionController::Base
  def home
    render 'layouts/index.html.erb'
  end
end
