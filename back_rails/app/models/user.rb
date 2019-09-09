class User < ApplicationRecord
  has_many :recipes, through: :saved_recipes
  has_many :saved_recipes
  has_many :user_ingredients
end
