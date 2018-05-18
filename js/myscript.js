class Vector {
  constructor (startX = 0, startY = 0, endX = 0, endY = 0) {
    this.startX = startX
    this.startY = startY
    this.endY = endY
    this.endY = endY
    this.posX = null
    this.posY = null
    this.degree = null
    this.isMouseDown = false

    chrome.storage.local.get(null, value => {
      this.config = value
    })
  }

  start (x, y) {
    this.startX = x
    this.startY = y
    this.isMouseDown = true
  }

  end (x, y) {
    this.endX = x
    this.endY = y
    this.isMouseDown = false

    this.degree = this.getRadian() * (180 / Math.PI)
    if (this.degree === 0) { return 'contextmenu' }
    if (this.degree < 0) { this.degree = this.degree + 360 }

    this.direction = this.getDirection()
    this.runCommand()
    console.log(this.getDirection())
  }

  runCommand () {
    return command[this.config[this.direction]]()
  }

  getRadian () {
    const x = this.endX - this.startX
    const y = this.startY - this.endY
    return Math.atan2(y, x)
  }

  getDirection () {
    if (this.degree > 337.5 || (this.degree >= 0 && this.degree <= 22.5)) { return 'right' }
    if (this.degree <= 67.5) { return 'rightUp' }
    if (this.degree <= 112.5) { return 'up' }
    if (this.degree <= 157.5) { return 'leftUp' }
    if (this.degree <= 202.5) { return 'left' }
    if (this.degree <= 247.5) { return 'leftDown' }
    if (this.degree <= 292.5) { return 'down' }
    if (this.degree <= 337.5) { return 'rightDown' }
  }
}

const vector = new Vector()
let canvas = null
let context = null

$(window).on('contextmenu', function () {
  return false
})

$(window).on('mousedown', function (e) {
  if (e.which !== 3) { return }
  vector.start(e.clientX, e.clientY)
  const style = `top: ${e.clientY - 150}px; left:${e.clientX - 150}px;`

  $('body').append('<canvas id="stroke" width="300" height="300" style="position: absolute;' + style + '"></canvas>')
  // $('#stroke').css({
    // 'position': 'absolute',
    // 'left': '0',
    // 'top': '0'
  // })
  canvas = document.getElementById('stroke')
  context = canvas.getContext('2d')
  context.beginPath();
  context.arc(150, 150, 100, 300, Math.PI*2, true);
  context.stroke();
  // context.strokeStyle = '#666';
  // context.lineWidth = 10;
  // context.moveTo(e.clientX, e.clientY)
})

$(window).on('mousemove', function (e) {
  // if (vector.isMouseDown) {
  //   context.lineTo(e.clientX, e.clientY)
  //   context.stroke();
  // }
})

$(window).on('mouseup', function (e) {
  if (e.which !== 3) { return }
  vector.end(e.clientX, e.clientY)
  $('#stroke').remove()
})
