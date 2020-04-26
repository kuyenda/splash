Rails.application.routes.draw do
  root 'application#app'
  get 'bar', to: 'application#bar'

  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  resources :users
  resources :topics, only: [:create, :destroy]
  resources :sketches do
    resources :codes, only: [:create, :destroy, :update]
  end
end
