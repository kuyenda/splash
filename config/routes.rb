Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'application#home'
  get '/style_page', to: 'application#style_page'
  get '/script_page', to: 'application#script_page'
  get '/example', to: 'application#example_page'
end
