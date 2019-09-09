class CreateUserIngredients < ActiveRecord::Migration[5.2]
  def change
    create_table :user_ingredients do |t|
      t.belongs_to :user
      t.string :name
      t.timestamps
    end
  end
end
