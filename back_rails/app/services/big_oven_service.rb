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
        #old
        # name: recipe["Name"],
        # image: recipe["ImageUrl"],
        # ingredient_id: recipe["IngredientId"]
        # metric_unit: recipe["MetricUnit"],
        # metric_quantity: recipe["MetricQuantity"],
        # display_quantity: recipe["DisplayQuantity"],
        # quantity: recipe["Quantity"],
        # unit: recipe["Unit"],
        
        #new
        recipe_id: recipe["RecipeID"]: ,
        name: recipe["Title"],
        # description: recipe["Description"],
        cuisine: recipe["Cuisine"],
        category: recipe["Category"],
        sub_category: recipe["Subcategory"],
        micro_category: recipe["Microcategory"],
        # primary_ingredient: recipe["PrimaryIngredient"],
        star_rating: recipe["StarRating"],
        web_url: recipe["WebURL"],
        # image_url: recipe["ImageURL"]
      )
    end
    
    # JSON.parse(response)
  end

# to get recipe details
  def self.get_recipe(recipe_id)
    url = "https://api2.bigoven.com/recipe/steps/#{recipe_id}?&api_key=#{ENV['API_KEY']}"
    uri = URI(url)
    response = Net::HTTP.get(uri)
    puts response
    # get ingredients
    JSON.parse(response)["Ingredients"].each do |ingredient|
      Recipe.find(recipe_id).ingredients.create!(
          # "Ingredients": [
        ingredient_id: ingredient["IngredientID"],
        name: ingredient["Name"],
        html_name: ingredient["HTMLName"],
        quantity: ingredient["Quantity"],
        display_quantity: ingredient["DisplayQuantity"],
        unit: ingredient["Unit"],
        metric_quantity: ingredient["MetricQuantity"],
        metric_display_quantity: ingredient["MetricDisplayQuantity"],
        metric_unit: ingredient["MetricUnit"],
        preparation_notes: ingredient["PreparationNotes"],
    
          #   {
        #   IngredientId: 2016375,
        #   Name: 'Olive Oil',
        #   MetricUnit: 'ml',
        #   MetricQuantity: 59,
        #   DisplayQuantity: '1/4',
        #   Quantity: 0.25,
        #   Unit: 'cup'
        # }
      )
    end

    JSON.parse(response)["Steps"].each do |step|
      Recipe.find(recipe_id).steps.create!(
        text: step["Text"]
      )
    end
    # JSON.parse(response)
  end
end

# RecipeService.search # def self.search
# RecipeService.new.search # def self.search

# chefs_plate_api = ApiService.new('chefspate.com', '123kjhasd')
# chefs_plate_api = ApiService.new('chefspate.com', '123kjhasd')

# api.search()

