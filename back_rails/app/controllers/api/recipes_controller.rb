class Api::RecipesController < ApplicationController
  # def index
  #   # puts query_parameters.inspect
  #   recipes = BigOvenService.get_steps
  #   render json: recipes
  # end

  def index
    recipes = Recipe.all
    render json: recipes
  end
    

  # user recipe form
  def new
    # recipes = BigOvenService.search_recipes
    # render json: recipes
    recipes = Ingredient.all
    render json: recipes

    # something like the below when steps DB is seeded
    # raise @steps.inspect # debug
    # @steps = Step.all
  end



end

