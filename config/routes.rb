Rails.application.routes.draw do
  root 'application#home'
  get 'style_page', to: 'application#style_page'

  get 'examples', to: 'examples#index'
  get 'examples/example', to: 'examples#example'
  get 'examples/data', to: 'examples#data'
  get 'examples/help', to: 'examples#help'
  post 'examples/save', to: 'examples#save_code'
  resources :examples

  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'
  resources :users
end
