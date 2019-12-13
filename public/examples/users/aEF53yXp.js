let t = 0
let tx = "你好，我是项目的开发者。 \n\
如果您看不到任何示例，\n\
比如浏览器提示找不到文件时，\n\
这可能是由heroku的清理机制引起的。\n\
heroku允许储存数据库，\n\
而其他文件将会定期被清理，\n\
如果我们打算在此平台继续部署，\n\
可能需要重构文件保存机制，\n\
然后使用专业的平台管理文件 \n\
抱歉"

function setup() {
  render()
  textAlign(CENTER, CENTER)
  textSize(30)
}

function draw() {
  background(map(noise(t), 0, 1, 0, 255), 0, 50)
  t += 1e-2
  fill(255)
  stroke(0)
  text(tx, width/2, height/2 + map(noise(t), 0, 1, -5, 5))
}
