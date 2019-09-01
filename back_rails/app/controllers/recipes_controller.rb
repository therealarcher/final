class RecipesController < ApplicationController
  def index
    # puts query_parameters.inspect
    recipes = BigOvenService.get_steps
    render json: recipes
  end

end

