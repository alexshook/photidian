Photodian::Application.routes.draw do
  root to: 'pages#index'
  devise_for :users

  post 'save_photo' => 'photos#index'
  resources :users, only: [:index, :show]
  resources :photos
end
