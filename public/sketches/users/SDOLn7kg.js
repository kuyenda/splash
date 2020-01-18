let pallete;
let gb ;
let fx = [], fy = [], fw = [], fh = [];

function setup() {
  createCanvas(800, 800);
  noLoop();
  pallete = ["#3d348b", "#7678ed", "#f7b801", "#f18701", "#f35b04"];
  bg = createGraphics(width, height);
  bg.noStroke();
  for (let i = 0; i < 300000; i++) {
    let x = random(width);
    let y = random(height);
    let s = noise(x*0.01, y*0.01)*2;
    bg.fill(240, 20);
    bg.rect(x, y, s, s);
  } 
}

function draw() {
  background(0);
  rectRec(0, 0, width, height, 30);
  for (let i = 0; i < fx.length; i++) {
    form(fx[i], fy[i], fw[i], fh[i]);
  }
  fx.length = fy.length = fw.length = fh.length = 0;
  image(bg, 0, 0);
}

function rectRec(x_, y_, w_, h_, minSize) {
  let wCount = int(random(2, 6));
  let hCount = int(random(2, 4));
  let w = w_ / wCount;
  let h = h_ / hCount;
  for (let i = 0; i < wCount; i++) {
    for (let j = 0; j < hCount; j++) {
      let x = x_ + i * w;
      let y = y_ + j * h;
      if (random(1) < 0.8 && w + h > minSize) {
        rectRec(x, y, w, h);
      } else {
        stroke(0);
        fill(random(pallete));
        rect(x, y, w, h);
        noStroke();
        fill(0);
        circle(x + w / 2, y + h / 2, 3);
        if (random(1) < 0.1) {
          fx.push(x + w / 2);
          fy.push(y + h / 2);
          fw.push(w);
          fh.push(h);
        }
      }
    }
  }
}


function form(x, y, w, h) {
  let hw = w / 2;
  let hh = h / 2;
  let xoff = random(-1, 1) * w;
  let yoff = random(-1, 1) * h;
  let sw = hw * random(0.2, 1);
  let sh = hh * random(0.2, 1);

  push();
  translate(x, y);
  fill(255, 120);
  noStroke();
  beginShape(QUAD_STRIP);
  vertex(-hw, -hh);
  vertex(-sw + xoff, -sh + yoff);
  vertex(-hw, hh);
  vertex(-sw + xoff, sh + yoff);
  vertex(hw, hh);
  vertex(sw + xoff, sh + yoff);
  vertex(hw, -hh);
  vertex(sw + xoff, -sh + yoff);
  vertex(-hw, -hh);
  vertex(-sw + xoff, -sh + yoff);
  endShape();

  stroke(0);
  strokeWeight(0.5);
  line(-hw, -hh, -sw + xoff, -sh + yoff);
  line(-hw, hh, -sw + xoff, sh + yoff);
  line(hw, hh, sw + xoff, sh + yoff);
  line(hw, -hh, sw + xoff, -sh + yoff);

  beginShape();
  fill(random(pallete));
  strokeWeight(1);
  vertex(-sw + xoff, -sh + yoff);
  vertex(-sw + xoff, sh + yoff);
  vertex(sw + xoff, sh + yoff);
  vertex(sw + xoff, -sh + yoff);
  endShape(CLOSE);

  noStroke();
  fill(0);
  circle(xoff, yoff, 3);
  pop();
}

function keyPressed() {
  redraw();
}