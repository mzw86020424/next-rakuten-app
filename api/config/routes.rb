Rails.application.routes.draw do
  resources :samples, only: [:index]
  namespace :api do
    namespace :v1 do
      resources :posts
      resources :nicodous, only: [:index]
    end
  end
end
