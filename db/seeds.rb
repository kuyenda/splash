# Users
User.create!(name: "Example User",
             email: "example@railstutorial.org",
             password: "foobar",
             password_confirmation: "foobar")

User.create!(name: "kuyenda",
             email: "cocoon.co.up@gmail.com",
             password: "kuyenda",
             password_confirmation: "kuyenda")

99.times do |n|
  name = FFaker::NameJA.name
  email = "example-#{n+1}@railstutorial.org"
  password = "password"
  User.create!(name: name,
               email: email,
               password: password,
               password_confirmation: password)
end

# Topics
users = User.order(:created_at).take(6)
50.times do
  content = FFaker::LoremJA.sentence
  users.each { |user| user.topics.create!(content: content) }
end

# Sketches
Sketch.create!(title: "hello world",
               view: 100,
               clap: 99,
               description: "welcome to splash!",
               digit: "aEF53yXp",
               slug: "aef53yxp")
