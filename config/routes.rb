Photodian::Application.routes.draw do
  root to: 'pages#index'
  devise_for :users

  post 'save_photo' => 'photos#save_photo'
  resources :users, only: [:index, :show]
  resources :photos
end
