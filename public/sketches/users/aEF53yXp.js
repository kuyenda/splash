let t = 0
let tx = "WELCOME SPLASH"

function setup() {
  render()
  textAlign(CENTER, CENTER)
  textSize(20)
}

function draw() {
  background(0, map(noise(t), 0, 1, 0, 255), 50)
  t += 1e-2
  fill(255)
  stroke(0)
  strokeWeight(5)
  text(tx, width / 2, height / 2 + map(noise(t), 0, 1, -5, 5))
}