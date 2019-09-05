require 'net/http'
require 'json'

class BigOvenService
  class << self #so we don't have to type .self before methods
    def search_recipes(*ingredients)
      # splat * operator
      # search_recipes('quinoa', 'corn', 'beef')
      # ingredients => ['quinoa', 'corn', 'beef']
      
      i_str = ''
      ingredients.each do |ingredient|
        ingredient != ingredients.last ? i_str += ingredient + '&' : i_str += ingredient
      end

      url = "https://api2.bigoven.com/recipes?any_kw=#{i_str}&api_key=#{ENV['API_KEY']}"
      uri = URI(url)
      response = Net::HTTP.get(uri)
      
      # parsed_response = JSON.parse(response)["Results"]
      # puts JSON.parse(response)["Results"]
      # find array of search results RecipeIDs
      # returned_ids = []    
      # parsed_response.each do |result|
      #   returned_ids.push(result["RecipeID"])
      # end
      # to filter out returned values with ids already in database
      # Recipe.where('RecipeID': returned_ids)
      
      JSON.parse(response)["Results"].each do |recipe|
        if (!Recipe.exists?(recipe["RecipeID"]))
          Recipe.create!(
            id: recipe["RecipeID"] ,
            name: recipe["Title"],
            # description: recipe["Description"],
            cuisine: recipe["Cuisine"],
            category: recipe["Category"],
            sub_category: recipe["Subcategory"],
            # micro_category: recipe["Microcategory"],
            # primary_ingredient: recipe["PrimaryIngredient"],
            star_rating: recipe["StarRating"],
            web_url: recipe["WebURL"],
            image_url: recipe["PhotoUrl"]
          )
        end 
      end
    end

  # to get recipe details
    def get_recipe(id)
      recipe = Recipe.find(id)
      url = "https://api2.bigoven.com/recipe/steps/#{recipe.id}?&api_key=#{ENV['API_KEY']}"
      uri = URI(url)
      response = Net::HTTP.get(uri)
      puts response
      # get ingredients

      #some logic in here to only save to DB if !in DB

      JSON.parse(response)["Ingredients"].each do |ingredient|
        # recipe.ingredients.create!(
        if (!Ingredient.exists?(ingredient["IngredientID"]))  
        Ingredient.create!(
          id: ingredient["IngredientID"],
          name: ingredient["Name"],
          html_name: ingredient["HTMLName"]
          # quantity: ingredient["Quantity"],
          # display_quantity: ingredient["DisplayQuantity"],
          # unit: ingredient["Unit"],
          # metric_quantity: ingredient["MetricQuantity"],
          # metric_display_quantity: ingredient["MetricDisplayQuantity"],
          # metric_unit: ingredient["MetricUnit"],
          # preparation_notes: ingredient["PreparationNotes"]
        )
        end
      end

      if (recipe.recipe_ingredients.count > 0)
        recipe.recipe_ingredients.destroy_all
        recipe.save
        recipe.reload
      end
      JSON.parse(response)["Ingredients"].each do |ingredient|
        
        # if (!recipe.recipe_ingredients.find_by(ingredient_id: ingredient["IngredientID"]))
        recipe.recipe_ingredients.create!(
          ingredient_id: ingredient["IngredientID"],
          quantity: ingredient["Quantity"],
          display_quantity: ingredient["DisplayQuantity"],
          unit: ingredient["Unit"],
          metric_quantity: ingredient["MetricQuantity"],
          metric_display_quantity: ingredient["MetricDisplayQuantity"],
          metric_unit: ingredient["MetricUnit"],
          preparation_notes: ingredient["PreparationNotes"]
        )
        # end
      end
      
      recipe.steps = ''
      steps = JSON.parse(response)["Steps"]
      steps.each do |step|
        step != steps.last ? recipe.steps += step["Text"] + ',' : recipe.steps += step["Text"]
        # recipe.steps +=  step["Text"] + ','
      end
      
    # recipe.steps = steps_string
    recipe.save

      # JSON.parse(response)
    end
  end
end
# RecipeService.search # def self.search
# RecipeService.new.search # def self.search

# chefs_plate_api = ApiService.new('chefspate.com', '123kjhasd')
# chefs_plate_api = ApiService.new('chefspate.com', '123kjhasd')

# api.search()

