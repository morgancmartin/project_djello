Rails.application.routes.draw do
  root to: 'static_pages#index'
  devise_for :users, controllers: { registrations: 'users/registrations' }

  scope :api do
    scope :v1 do
      resources :boards, only: [:create, :show, :index, :update, :destroy] do
        resources :lists
      end
      resources :lists, only: [] do
        resources :cards
      end
      resources :users
    end
  end
end
