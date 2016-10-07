Rails.application.routes.draw do
  root to: 'static_pages#index'
  devise_for :users

  scope :api do
    scope :v1 do
      resources :boards, only: [:create, :show, :index, :update, :destroy]
    end
  end
end
