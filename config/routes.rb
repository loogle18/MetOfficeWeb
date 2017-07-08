Rails.application.routes.draw do
  root to: 'stations#index'
  resources :stations, only: :show
  get '*path', to: 'stations#index'
end
