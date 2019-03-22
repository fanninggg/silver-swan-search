Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: :registrations }
  root to: 'jobs#index'
  resources :jobs, only: [:index, :show] do
    resources :applications, only: :create, controller: :job_applications
    resources :rejections, only: :create, controller: :job_rejections
  end
  resources :applications, only: [:show, :index], controller: :job_applications
  get '/authorise', to: 'pages#authorise'
  get '/credentials', to: 'pages#credentials'
  namespace :admin do
    resources :candidates, only: [:index]
    resources :applications, only: [:index], controller: :job_applications
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
