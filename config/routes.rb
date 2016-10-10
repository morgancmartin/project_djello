Rails.application.routes.draw do
  root to: 'static_pages#index'
  devise_for :users

  scope :api do
    scope :v1 do
      resources :boards, only: [:create, :show, :index, :update, :destroy] do
        resources :lists do
          resources :cards  # probably a way to use shallow: true,
                            # but I'm not seeing it.
        end
      end
    end
  end
end
