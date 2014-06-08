Photodian::Application.routes.draw do
  root to: 'photos#new'
  get 'pages/about'

  devise_for :users
  resources :users, only: [:index, :show] do
    member do
      get :followers, :following
    end
  end

  resources :photos, only: [:index, :show, :new, :create, :edit, :update]

  resources :relationships, only: [:create, :destroy]

  resources :tags, only: [:show]
end
