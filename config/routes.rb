Rails.application.routes.draw do
  root 'application#home'
  get 'css', to: 'application#css'
  get 'debug', to: 'application#debug'

  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get 'sketches', to: 'sketches#index'
  get 'sketches/sandbox', to: 'sketches#sandbox'
  get 'sketches/preview', to: 'sketches#preview'
  get 'sketches/data', to: 'sketches#json'
  get 'sketches/help', to: 'sketches#help'
  post 'sketches/save', to: 'sketches#save_code'

  resources :users
  resources :sketches
  resources :topics, only: [:create, :destroy]
end
