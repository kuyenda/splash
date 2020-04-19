Rails.application.routes.draw do
  root 'application#home'
  get 'css', to: 'application#css'
  get 'debug', to: 'application#debug'
  get 'sp', to: 'application#static'
  get 'h', to: 'application#help'

  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get 'sketches', to: 'sketches#index'
  get 'sketches/sb', to: 'sketches#sandbox'

  resources :users
  resources :sketches
  resources :topics, only: [:create, :destroy]
  resources :codes, only: [:create, :destroy]
end
