let particles = [];
let pallete = ["#ffffff", "#e01a4f","#f15946","#f9c22e","#53b3cb"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  newParticles();
  frameRate(30);
}


function draw() {
  for(let i=0; i<particles.length; i++){
    particles[i].run();
    if(particles[i].isDead()){
    particles.splice(i, 1);
    }
  }
  if(particles.length == 0){
    newParticles();
  }
}

function newParticles(){
  background(0);
  shuffle(pallete, true);
  noiseSeed(int(random(100000)));
  for(let i=0; i<10000; i++){
    particles.push(new Particle(random(-0.5, 1.5)*width, random(-0.5,1.5)*height));
  }
}

class Particle{
  constructor(x, y){
   this.x = x;
   this.y = y;
    this.s = 0;
    this.noiseScale = 0.002;
    this.num1 = map(noise(this.x*this.noiseScale, this.y*this.noiseScale), 0, 1, -3, 8.5);
    this.num2 = int(constrain(this.num1, 0, 4));
    this.col = color(pallete[this.num2]);
    this.nn = 0;
    this.life = 800;
  }
  
  show(){
    noStroke();
    fill(this.col);
    rect(this.x, this.y, this.s, this.s);
  }
  
  move(){
    let maxS = map(this.life, 800, 0, 10, 0);
    let angle = noise(this.x*this.noiseScale, this.y*this.noiseScale, this.nn)*13;
    this.x += cos(angle);
    this.y += sin(angle);
    this.s = noise(this.x*0.05, this.y*0.05, this.nn)*maxS;
    this.nn += 0.0005;
    this.life --;
  }
  
  isDead(){
    if(this.life < 0){
      return true;
    }else{
      return false;
    }
  }
  
  run(){
    this.show();
    this.move();
  }
}