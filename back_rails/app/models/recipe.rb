class Recipe < ApplicationRecord
  has_many :ingredients
  has_many :steps
end
