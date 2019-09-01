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
    JSON.parse(response)["Results"][1]
    # JSON.parse(response)
  end

# to get steps of recipe
  def self.get_steps
    url = "https://api2.bigoven.com/recipe/steps/2049687?&api_key=#{ENV['API_KEY']}"
    uri = URI(url)
    response = Net::HTTP.get(uri)
    puts response
    JSON.parse(response)
    # JSON.parse(response)
  end
end

# RecipeService.search # def self.search
# RecipeService.new.search # def self.search

# chefs_plate_api = ApiService.new('chefspate.com', '123kjhasd')
# chefs_plate_api = ApiService.new('chefspate.com', '123kjhasd')

# api.search()

