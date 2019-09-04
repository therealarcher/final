# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding Data ..."

# def open_asset(file_name)
#   File.open(Rails.root.join('db', 'seed_assets', file_name))
# end

puts "Finding or Creating Recipes..."

rec1 = Recipe.find_or_create_by! name: "brown rice dish"


puts "Re-creating steps"

# Step.destroy_all

rec1.steps.create!({
  name: "brown rice",
  quantity: 1,
  unit: "cup",
  ingredient_id: 21117701,
  metric_quantity: 237.0,
  metric_unit: "ml"
  preparation_notes: "no notes for you!"
})

rec1.steps.create!({
  name: "butter",
  quantity: 0.5,
  unit: "cup",
  ingredient_id: 1000,
  metric_quantity: 237.0,
  metric_unit: "ml",
  preparation_notes: "mmmm... butter"
})

puts "Done!"