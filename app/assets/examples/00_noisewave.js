let docElement;
let sketchWindow;
let gameFont;
let setWidth = 640,
	setHeight = 480,
	setWindow = false;

// global values
let frames = 60;
let yoff = 0.0;

function preload() {
	gameFont = loadFont('/assets/Proggy.ttf');
}

function setup() {
	sketchWindow = select('#sketch')
	docElement = setWindow ? createCanvas(setWidth, setHeight) : createCanvas(sketchWindow.size().width, sketchWindow.size().height);
	docElement.parent('#sketch')
	// docElement.class('sketch-panel');

	// init
	frameRate(frames)
	angleMode(RADIUS)
	rectMode(CENTER)
	textAlign(CENTER, CENTER)
	textFont(gameFont);
}

function draw() {
	background('#ffeaa7');
	update();
	stroke(0);
	strokeWeight(4);
	fill(255);

	push();
	textAlign(LEFT, BOTTOM)
	textSize(58);
	text(frameCount, 0, height);
	pop();

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

function windowResized() {
	frameRate(frames);
	if (setWindow) {
		resizeCanvas(setWidth, setHeight);
		return;
	}
	resizeCanvas(sketchWindow.size().width, sketchWindow.size().height);
}

function btnSwitch(item) {}