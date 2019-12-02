let time = 0;
let angles = [];
function setup() {
    render()
}
function draw() {
    background(30);
    translate(width / 2, height);
    stroke(255);
    branch(200, 0);
}
function branch(lenth, n) {
    stroke((n*30)%255, (60+n*20)%255, (n*30)%255);
    strokeWeight(map(n,0,8,10,1))
    lenth = 0.75 * lenth;
    line(0, 0, 0, -lenth);
    translate(0, -lenth);
    if (lenth > 10) {
        for (let i = 0; i <= 1; i++) {
            angles[(i + 1) * n] = angles[(i + 1) * n] || random(-PI / 3, PI / 3);
            time += map(mouseX, 0, width, 5e-7, 1e-6);
            let theta = map(noise(time), 0, 1, -PI / 6, PI / 6);
            push();
            rotate(theta + angles[(i + 1) * n]);
            branch(lenth, n + 1);
            pop();
        }
    }
}
