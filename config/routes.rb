Rails.application.routes.draw do
  root 'application#app'
  get 'bar', to: 'application#bar'
  get 'box', to: 'application#box'

  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  resources :users
  resources :sketches
  resources :topics, only: [:create, :destroy]
  resources :codes, only: [:create, :destroy]
end
