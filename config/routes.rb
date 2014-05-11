Photodian::Application.routes.draw do
  root to: 'pages#index'
  devise_for :users

  resources :photos
end
