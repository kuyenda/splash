/**
* カラーパレット
*/

let pal = ["#1f2421","#216869","#49a078","#9cc5a1","#dce1de"];

let bgColor;
let seed;

function setup() {
 render();
 angleMode(DEGREES);
 background(255);
 noLoop();

 let cid = int(random(pal.length));
 bgColor = pal[cid];
 pal.splice(cid, 1);
 pal = shuffle(pal);

 seed = random(1e+4);

 background(bgColor);
}

function draw() {
 randomSeed(seed);
 background(bgColor);
 
 drawBranch(300, 500, 100, 180, 5);
}

/**
* 関数: 再帰的に枝を描画
*/
function drawBranch(x, y, len, ang, n) {
 /**
 * 入力,
 *   x, y: 始点の座標
 *   len: 枝の長さ
 *   ang: 枝の角度
 *   n: 深さ（>0）
 */

 // 枝の端点座標
 let ex = x + sin(ang) * len;
 let ey = y + cos(ang) * len;
 let c = color(pal[n%4]);
 
 strokeWeight(5);  stroke(c);
 line(x, y, ex, ey);  // 枝を描画
 
 // 深さが0以上の場合，新たな枝を描画
 if (n > 0) {
   drawBranch(ex, ey, len * 0.85, ang + random(-40, 40), n-1);
   drawBranch(ex, ey, len * 0.85, ang + random(-40, 40), n-1);
   drawBranch(ex, ey, len * 0.85, ang + random(-40, 40), n-1);
 }
}
