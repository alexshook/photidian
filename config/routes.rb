Photodian::Application.routes.draw do
  root to: 'photos#new'
  get 'pages/about'
  get 'search', to: 'users#search'
  post 'tags/add', to: 'photos#add_tag'

  devise_for :users
  resources :users, only: [:index, :show] do
    member do
      get :followers, :following
    end
  end

  resources :photos, only: [:index, :show, :new, :create, :edit, :update]

  resources :relationships, only: [:create, :destroy]

  resources :tags
end
