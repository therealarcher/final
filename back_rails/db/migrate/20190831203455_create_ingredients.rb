class CreateIngredients < ActiveRecord::Migration[5.2]
  def change
    create_table :ingredients do |t|
      t.belongs_to :recipe
      t.integer :ingredient_id
      t.string :name
      t.string :html_name
      t.integer :quantity
      t.string :display_quantity
      t.string :unit
      t.integer :metric_quantity
      t.string :metric_display_quantity
      t.string :metric_unit
      t.string :preparation_notes
      t.timestamps
    end
  end
end
