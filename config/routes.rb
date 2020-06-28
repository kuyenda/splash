Rails.application.routes.draw do
  get 'bar', to: 'application#bar'

  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # document_path
  root to: redirect('/documentation')
  get '/documentation/(:id)', to: 'documents#show',
    as: :document, defaults: {}

  # 资源路由
  resources :users
  resources :topics, only: [:create, :destroy]
  resources :sketches do
    resources :codes, only: [:create, :destroy, :update]
  end
end
