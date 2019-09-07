class CreateSavedRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :saved_recipes do |t|
      t.belongs_to :user
      t.belongs_to :recipe
      t.timestamps
    end
  end
end
