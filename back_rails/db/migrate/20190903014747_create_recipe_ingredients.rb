class CreateRecipeIngredients < ActiveRecord::Migration[5.2]
  def change
    create_table :recipe_ingredients do |t|
      t.belongs_to :recipe 
      t.belongs_to :ingredient
      t.decimal :quantity, precision: 10, scale: 2
      t.string :display_quantity
      t.string :unit
      t.decimal :metric_quantity, precision: 10, scale: 2
      t.string :metric_display_quantity
      t.string :metric_unit
      t.string :preparation_notes
      t.timestamps
    end
  end
end
