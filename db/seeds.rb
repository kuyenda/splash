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
  email = "robot-#{n+1}@splash.io"
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
               description: "welcome to splash alpha!",
               digest: "0x000000",
               slug: "0x000000")

25.times do |n|
  title = "s-#{n}"
  digest = Sketch.create_digests
  Sketch.create!(title: title,
                 digest: digest,
                 slug: digest)
end

# Codes
sketches = Sketch.all
sketches.each do |s|
  rand(3).times do
    code = FFaker::Lorem.characters
    s.codes.create!(code: code)
  end
end
