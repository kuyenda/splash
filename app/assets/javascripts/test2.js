let t = 0

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
	fill("#555")
	stroke("#fff");
	strokeWeight(5);
	background("#222")
	t += 1e-3;
	rotateX(noise(t) * 3);
	rotateY(noise(t) * 15);
	rotateZ(noise(t) * 2);
	box(300);
}