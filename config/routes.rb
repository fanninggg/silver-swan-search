Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: :registrations }
  root to: 'jobs#index'
  resources :jobs, only: :index
  get '/authorise', to: 'pages#authorise'
  get '/credentials', to: 'pages#credentials'
  namespace :admin do
    resources :candidates, only: [:index]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
