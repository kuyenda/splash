let frames = 60;
let yoff = 0.0;

function setup() {

  render()
	// init
	frameRate(frames)
	angleMode(RADIUS)
	rectMode(CENTER)
	textAlign(CENTER, CENTER)
}

function draw() {
	background('#ff1744');
	stroke(0);
	strokeWeight(10);
	fill(255);

	beginShape();

	let xoff = 0; // Option #1: 2D Noise
	// let xoff = yoff; // Option #2: 1D Noise

	// Iterate over horizontal pixels
	for (let x = 0; x <= width; x += 10) {
		// Calculate a y value according to noise, map to

		// Option #1: 2D Noise
		let y = map(noise(xoff, yoff), 0, 1, 200, 300);

		// Option #2: 1D Noise
		// let y = map(noise(xoff), 0, 1, 200,300);

		// Set the vertex
		vertex(x, y);
		// Increment x dimension for noise
		xoff += 0.05;
	}
	// increment y dimension for noise
	yoff += 0.01;
	vertex(width, height);
	vertex(0, height);
	endShape(CLOSE);
}