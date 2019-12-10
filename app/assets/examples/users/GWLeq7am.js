let rain_bitmap
let sprites = []

function setup() {
  render()
  color1 = color(255, 255, 255, 255)
  color2 = color(255, 255, 255, 128)
  rain_bitmap = createImage(7, 56)
  rain_bitmap.loadPixels();
  for (let i = 3; i <= 6; i++) {
    fillRect(rain_bitmap, 6-i, i*8, 1, 8, color1)
  }
  rain_bitmap.updatePixels();
  for(let i = 0; i<=500; i++){
    sprite = new Sprite(random(-width,width), random(-height,height))
    sprites.push(sprite);
  }
}

function draw() {
  background(0)
  for(let i = sprites.length-1; i>=0; i--){
    sprites[i].update();
    sprites[i].show();
    if(sprites[i].off()){
      sprites.splice(i, 1);
    }
    if(sprites.length < 500){
      sprites.push(new Sprite(random(-width,width), random(-height,height)))
    }
  }
}

function fillRect(bitmap,x1,y1,x2,y2,color) {
  bitmap.loadPixels();
  for (let i = min(x1,x2); i <= max(x1,x2); i++) {
    for (let j = min(y1,y2); j <= max(y1,y2); j++) {
      bitmap.set(i, j, color1);
    }
  }
  bitmap.updatePixels();
}

class Sprite {
  constructor(x, y){
   this.x = x;
   this.y = y;
   this.bitmap = rain_bitmap
   this.life = random(30, 100)
   this.opacity = 255
  }
  
  show(){
    if (this.off()) {
      return
    } else {
      image(this.bitmap, this.x, this.y)
    }
  }
  
  update() {
    this.x -= 2
    this.y += 12
    this.life -= 1
    this.opacity -= 8
  }
  
  off() {
    if(this.life < 0){
      return true;
    }else{
      return false;
    }
  }
}











