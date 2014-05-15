Photodian::Application.routes.draw do
  root to: 'pages#index'
  get 'pages/about'

  devise_for :users
  resources :users, only: [:index, :show] do
    member do
      get :followers, :following
    end
  end

  resources :photos, only: [:index, :show, :new, :create]

  resources :relationships, only: [:create, :destroy]
end
