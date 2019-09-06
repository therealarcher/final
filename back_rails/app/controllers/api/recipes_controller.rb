class Api::RecipesController < ApplicationController

  def index
    # @recipes = Recipe.all
    # render json: @recipes
    render json: BigOvenService.search_recipes(params[:term])
  end

  # user recipe form - "new" route probably not needed
  def new
    
    
    # recipes = BigOvenService.search_recipes
    # render json: recipes
    
    # BigOvenService.get_recipe(params[:id])
  
    # @ingredients = Ingredient.all
    # render json: @ingredients
  #   render json: BigOvenService.search_recipes(params[:term])
  end

  # def search
  #   render json: BigOvenService.search_recipes(params[:term])
  # end 
  
  # def search
  #   @recipe = Recipe.first
  #   render json: @recipe
  # end

  def create
  end
  

  def show
    BigOvenService.get_recipe(params[:id])

    selected = Recipe.find(params[:id])
    selected_ing = selected.recipe_ingredients.map{
      |ri| {name: ri.ingredient.name, quantity: ri.display_quantity, unit: ri.unit, notes: ri.preparation_notes}}
    selected_ing.push({steps: selected.steps})
    render json: selected_ing
    
    # @ingredients = Ingredient.all
    # render json: @ingredients
  end


end

