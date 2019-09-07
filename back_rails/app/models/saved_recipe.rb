class SavedRecipe < ApplicationRecord
  belongs_to :user
  belongs_to :recipe
end

# null: false, foreign_key: true