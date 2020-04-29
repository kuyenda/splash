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
Sketch.create!(title: "Welcome to splash",
               description: "This is an alpha version",
               digest: "0x123456",
               slug: "0x123456")

25.times do |n|
  title = "lorem#{n}"
  digest = Sketch.create_digests
  Sketch.create!(title: title,
                 description: "This is an alpha version",
                 digest: digest,
                 slug: digest)
end
sketches = Sketch.all
sketches.each do |sketch|
  code = 'function setup() {
  
}

function draw() {
  
}'
  sketch.codes.create!(code: code, filename: "index")
end
