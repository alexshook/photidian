# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

tags = Tag.create([
  { name: 'happy', id: 1 },
  { name: 'exuberant', id: 2 },
  { name: 'funny', id: 3 },
  { name: 'silly', id: 4 },
  { name: 'serious', id: 5 },
  { name: 'sad', id: 6 },
  { name: 'thoughtful', id: 7 },
  { name: 'tired', id: 8 },
  { name: 'energized', id: 9 },
  { name: 'neutral', id: 10 },
])
