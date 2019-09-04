require 'net/http'
require 'json'

class BigOvenService

  def self.search_recipes(*ingredients)
    # search_recipes('quinoa', 'corn', 'beef')
    # ingredients => ['quinoa', 'corn', 'beef']
    url = "https://api2.bigoven.com/recipes?any_kw=quinoa&api_key=#{ENV['API_KEY']}"
    uri = URI(url)
    response = Net::HTTP.get(uri)
    # puts response
    JSON.parse(response)["Results"].each do |recipe|
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

# to get recipe details
  def self.get_recipe(id)
    recipe = Recipe.find(id)
    url = "https://api2.bigoven.com/recipe/steps/#{recipe.id}?&api_key=#{ENV['API_KEY']}"
    uri = URI(url)
    response = Net::HTTP.get(uri)
    puts response
    # get ingredients

    #some logic in here to only save to DB if !in DB

    JSON.parse(response)["Ingredients"].each do |ingredient|
      # recipe.ingredients.create!(
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

    JSON.parse(response)["Ingredients"].each do |ingredient|
      puts "INGREDIENT!!! *********** ", ingredient
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
    end
    
    recipe.steps = ''
    JSON.parse(response)["Steps"].each do |step|
      
      recipe.steps +=  step["Text"] + ','
      
    end
    
  # recipe.steps = steps_string
  recipe.save

    # JSON.parse(response)
  end
end

# RecipeService.search # def self.search
# RecipeService.new.search # def self.search

# chefs_plate_api = ApiService.new('chefspate.com', '123kjhasd')
# chefs_plate_api = ApiService.new('chefspate.com', '123kjhasd')

# api.search()

