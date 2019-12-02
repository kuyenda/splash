let w = 854,
  h = 480;
let l1 = 200,
  l2 = 200;
let a1 = 0,
  a2 = 0,
  a1_v = 0,
  a2_v = 0,
  a1_a = 0,
  a2_a = 0,
  g = 1;
let m1 = 40,
  m2 = 40;
let x1 = 0,
  y1 = 0;
let x2 = 0,
  y2 = 0;
let px = 0,
  py = 0;
let pen;
let vy = h / 8;
let show = true;

function setup() {
  render()
  pen = createGraphics(width, height);
  w = width
  h = height
  a1 = map(random(), 0, 1, -TWO_PI, TWO_PI);
  a2 = map(random(), 0, 1, -TWO_PI, TWO_PI);
}

function draw() {
  // updating
  px = x2;
  py = y2;
  a1_a = (-g * (2 * m1 + m2) * sin(a1) - m2 * g * sin(a1 - 2 * a2) -
      2 * sin(a1 - a2) * m2 * (a2_v * a2_v * l2 + a1_v * a1_v * l1 * cos(a1 - a2))) /
    (l1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2)));
  a2_a = (2 * sin(a1 - a2) * (a1_v * a1_v * l1 * (m1 + m2) +
    g * (m1 + m2) * cos(a1) + a2_v * a2_v * l2 * m2 * cos(a1 - a2))) / (l2 *
    (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2)));
  x1 = l1 * sin(a1);
  y1 = l1 * cos(a1);
  x2 = x1 + l2 * sin(a2);
  y2 = y1 + l2 * cos(a2);
  
  // draw
  background(255);

  // info
  textSize(20);
  textAlign(LEFT, BOTTOM);
  textFont('consolas');
  text('Θ1 : ' + (degrees(a1)).toFixed(1), 10, height - 20);
  text('Θ2 : ' + (degrees(a2)).toFixed(1), 10, height);
  translate(w / 2, vy);
  pen.strokeWeight(4);
  pen.stroke(map(y2, 0, height, 255, 0));
  if (x2 != 0 && px != 0) {
    pen.line(w / 2 + px, vy + py, w / 2 + x2, vy + y2);
  }
  image(pen, -w / 2, -vy);
  fill(0);
  strokeWeight(3);
  line(0, 0, x1, y1);
  strokeWeight(1);
  line(0, 0, 0, height);
  line(x1, y1, x1, y1 + height);
  strokeWeight(3);
  ellipse(x1, y1, m1, m1);
  line(x1, y1, x2, y2);
  ellipse(x2, y2, m2, m2);
  
  // updating
  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;
}
