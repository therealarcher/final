class CreateSteps < ActiveRecord::Migration[5.2]
  def change
    create_table :steps do |t|
      t.belongs_to :recipe
      t.string :name
      t.float :quantity
      t.string :unit
      t.integer :ingredient_id
      t.float :metric_quantity
      t.string :metric_unit
      t.string :preparation_notes
      t.timestamps
    end
  end
end
