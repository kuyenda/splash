let fixing = false;
let container;
let p5obj;
let setWidth = 0,
	setHeight = 0;

function render(w = setWidth, h = setHeight, r = P2D) {
	container = createDiv('')
	container.class('p5')
	fixing = (w == 0 || h == 0) ? false : true
	if (fixing) {
		setWidth = w
		setHeight = h
	}
	p5obj = fixing ? createCanvas(w, h, r) : createCanvas(container.size().width, container.size().height, r);
	p5obj.parent(container)
}

function windowResized() {
	if (fixing) {
		resizeCanvas(setWidth, setHeight);
		return;
	}
	resizeCanvas(container.size().width, container.size().height);
}