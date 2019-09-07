Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # root to: 'recipes#index'
  # resources :recipes, only: [:index]


  # a suggestion by someone online (to generate an API namespace)
  namespace :api do
    # root to: 'recipes#index'
    # get '/recipes/search?term=', to: 'recipes#search'
    get '/recipes/search' => 'recipes#search'
    resources :recipes, only: [:index, :new, :create, :show]
    resources :users, only: [:new]
    resources :saved_recipes, only: [:create, :destroy]
    # post '/users/new' => 'users#new'
    
    # get '/login' => 'users#new'
    # post '/login' => 'users#create'
    # get '/login' => 'users#index'
  end

end