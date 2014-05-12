Photodian::Application.routes.draw do
  root to: 'pages#index'
  devise_for :users

  resources :users, only: [:index, :show]
  resources :photos
end
