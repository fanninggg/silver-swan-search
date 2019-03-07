Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: :registrations }
  root to: 'pages#home'
  get '/authorise', to: 'pages#authorise'
  namespace :admin do
    resources :candidates, only: [:index]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
