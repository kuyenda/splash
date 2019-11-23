Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'application#home'
  get 'examples', to: 'examples#index'
  get 'examples/example', to: 'examples#example'
  get 'style_page', to: 'application#style_page'
  resources :examples
end
