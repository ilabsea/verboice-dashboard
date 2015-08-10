Rails.application.routes.draw do
  root 'dashboards#index'

  get 'sign_in', to: 'sessions#new'

  resources :sessions, only: [:new, :create]
  delete 'sign_out', to: 'sessions#destroy'

end
