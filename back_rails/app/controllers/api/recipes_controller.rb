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
    
    render json: BigOvenService.get_recipe(params[:id])

    # something like the below when steps DB is seeded
    # raise @steps.inspect # debug
    # @steps = Step.all

  end

  def search
    render json: BigOvenService.search_recipes(params[:term])
  end 


end

