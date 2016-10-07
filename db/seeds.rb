# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


puts "seeding..."

puts "creating user"

first_user =
  User.create(
  email: 'morganm5201@gmail.com',
  password: 'password',
  password_confirmation: 'password',
  name: 'Morgan Martin')

puts 'creating welcome board'
first_user.boards.create(title: 'Welcome Board')
