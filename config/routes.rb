Rails.application.routes.draw do
  root 'dashboards#index'

  get 'sign_in', to: 'sessions#new'

  resources :sessions, only: [:new, :create]
  delete 'sign_out', to: 'sessions#destroy'

  namespace :api, defaults: {format: :json} do
    resources :channels, only: [:index]
    resources :call_flows, only: [:index]
    resources :projects, only: [:index]
  end
end
