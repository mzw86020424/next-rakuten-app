Rails.application.routes.draw do
  resources :samples, only: [:index]
  namespace :api do
    namespace :v1 do
      resources :posts
    end
  end
end
