class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
      t.integer :recipe_id
      t.string :name
      # t.string :description
      t.string :cuisine
      t.string :category
      t.string :sub_category
      t.string :micro_category
      # t.string :primary_ingredient
      t.decimal :star_rating
      t.string :web_url
      t.string :image_url
      t.timestamps
    end
  end
end
