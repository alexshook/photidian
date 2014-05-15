Photodian::Application.routes.draw do
  root to: 'pages#index'
  get 'pages/about'

  devise_for :users
  resources :users, only: [:index, :show] do
    member do
      get :followers, :following
    end
  end

  post 'save_photo' => 'photos#save_photo'
  resources :photos, only: [:index, :show]

  resources :relationships, only: [:create, :destroy]
end
