class SavedRecipe < ApplicationRecord
  belongs_to :user
  belongs_to :recipe

  validates :name, presence: true, uniqueness: true
end

# null: false, foreign_key: true