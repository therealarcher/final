class Api::SavedRecipesController < ApplicationController

  # api/saved_recipes
  def create
    @saved_recipe = current_user.saved_recipes.build(recipe_id: params[:recipe_id])
    if @saved_recipe.save
      head 201 ## successful response
    else
      render json: @saved_recipe.errors, status: :unprocessable_entity
    end
  end
  def index 
    # render json: current_user.saved_recipes
    render json: current_user.saved_recipes.to_json(:include => :recipe)
  end
  # /saved_recipes/:id
  def destroy
    SavedRecipe.find(params[:id]).delete
    head :no_content
  end
end