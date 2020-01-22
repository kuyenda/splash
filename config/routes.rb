Rails.application.routes.draw do
  root 'application#home'
  get 'css', to: 'application#css'
  get 'debug', to: 'application#debug'

  get 'sketches', to: 'sketches#index'
  get 'sketches/sandbox', to: 'sketches#sandbox'
  get 'sketches/data', to: 'sketches#json'
  get 'sketches/help', to: 'sketches#help'
  post 'sketches/save', to: 'sketches#save_code'
  resources :sketches

  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'
  resources :users

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
