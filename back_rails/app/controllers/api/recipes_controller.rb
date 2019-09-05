class Api::RecipesController < ApplicationController
  # def index
  #   # puts query_parameters.inspect
  #   recipes = BigOvenService.get_steps
  #   render json: recipes
  # end

  # @ necessary?
  def index
    @recipes = Recipe.all
    render json: @recipes
  end
    

  # user recipe form - "new" route probably not needed
  def new
    # recipes = BigOvenService.search_recipes
    # render json: recipes
    @ingredients = Ingredient.all
    render json: @ingredients

    # something like the below when steps DB is seeded
    # raise @steps.inspect # debug
    # @steps = Step.all
  end

  def create
  end
  
  def search
    @recipe = Recipe.first
    render json: @recipe
  end

  def show
  end


end

