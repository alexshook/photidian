Photodian::Application.routes.draw do
  root to: 'pages#index'
  devise_for :users

  post 'save_photo' => 'photos#index'
  get 'test' => 'photos#test_methods'
  resources :users, only: [:index, :show]
  resources :photos
end
