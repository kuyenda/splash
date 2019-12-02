function Wall() {
  if (arguments.length == 0) {
    this.ps = createVector(random(width), random(height));
    this.pe = p5.Vector.sub(this.ps, p5.Vector.fromAngle(radians(random(360)), random(10,100)))
  } else {
    this.ps = createVector(arguments[0], arguments[1]);
    this.pe = createVector(arguments[2], arguments[3]);
  }
  this.display = function() {
    stroke(255);
    strokeWeight(1);
    line(this.ps.x, this.ps.y, this.pe.x, this.pe.y);
  }
}
function Player(x, y) {
  this.x = x, this.y = y;
  this.moves = 10;
  this.radius = 50;
  this.ray = [];
  this.display = function() {
    // fill(color);
    // ellipse(this.x, this.y, this.radius, this.radius);
  }
  this.create_ray = function() {
    for (let i = 0; i < 360; i++) {
      this.ray[i] = p5.Vector.fromAngle(radians(i), width * 2);
    }
  }
  this.pointAt = function(x, y) {
    this.x = x;
    this.y = y;
  }
}
let slider;
let walls = [],
  walls_sum = 0;
let player;
let t = 0;
function setup() {
  render()
  angleMode(DEGREES);
  walls_sum = floor(random(100));
  slider = createSlider(1, 100, 10);
  slider.position(width / 2 - slider.size().width / 2, height / 3 - 50);
  slider.style('width', '120px');
  for (let i = 0; i < walls_sum; i++) {
    walls[i] = new Wall();
  }
  walls.push(new Wall(0, 0, 0, height));
  walls.push(new Wall(0, 0, width, 0));
  walls.push(new Wall(width, 0, width, height));
  walls.push(new Wall(0, height, width, height));
  player = new Player(width / 2, height / 2);
  player.create_ray();
}
function draw() {
  // change settings
  let radius = map(slider.value(), 1, 100, 1, 100);
  player.radius = radius;
  t += 1e-1;
  background(30);
  // update walls
  for (let i = walls.length - 1; i >= 0; i--) {
    walls[i].display();
  }
  // update player
  player.display();
  player.pointAt(mouseX, mouseY);
  for (let i = player.ray.length - 1; i >= 0; i--) {
    let closest = null;
    let record = Infinity;
    for (let j = walls.length - 1; j >= 0; j--) {
      let p = has_point(player.x, player.y,
        player.ray[i].x, player.ray[i].y,
        walls[j].ps.x, walls[j].ps.y,
        walls[j].pe.x, walls[j].pe.y
      );
      // line(player.x, player.y, closest.x, closest.y);
      if (p) {
        let o = createVector(player.x, player.y);
        let d = p5.Vector.dist(o, p);
        if (record > d) {
          record = d;
          closest = p;
        }
      }
    }
    if (closest) {
      stroke(
        255,
        0 + map(radius, 1, 100, 0, 255)
      );
      strokeWeight(4);
      line(player.x, player.y, closest.x, closest.y);
    }
  }
}
function has_point(x1, y1, x2, y2, x3, y3, x4, y4) {
  let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
  let u = -(((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)));
  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    let px = x1 + t * (x2 - x1);
    let py = y1 + t * (y2 - y1);
    return createVector(px, py);
  } else {
    return null;
  }
}
