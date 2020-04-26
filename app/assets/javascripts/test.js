var rows = 50,
    cols = 50,
    grid = 600 / rows,
    terrain = [],
    xoff = 0.0,
    yoff = 0.0;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(60);
    for (var y = 0; y < rows; y++) {
        terrain[y] = new Array();
        for (var x = 0; x < cols; x++) {
            terrain[y].push(0);;
        }
    }
}

function draw() {
    background(0);
    noStroke();
    rotateX(PI / 4.0);
    translate(-grid * rows / 2, -grid * cols / 2)
    noFill();
    stroke(255);

    for (var x = 0; x < rows; x++) {
        for (var y = 0; y < cols; y++) {
            terrain[x][y] = map(noise(0.05 * x + xoff, 0.05 * y + yoff), 0, 1, 0, 200);
        }
    }
    yoff += 0.01;

    for (var y = 0; y < rows - 1; y++) {
        beginShape(TRIANGLE_STRIP);
        for (var x = 0; x < cols; x++) {
            vertex(x * grid, y * grid, terrain[x][y]);
            vertex(x * grid, (y + 1) * grid, terrain[x][y + 1]);
        }
        endShape();
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        console.log(terrain);
    }
}