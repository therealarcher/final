class ApplicationController < ActionController::API
  # def index
  #   # puts query_parameters.inspect
  #   recipes = BigOvenService.search_recipes
  #   render json: recipes
  # end

  def current_user
    current_user = User.first
  end
end
