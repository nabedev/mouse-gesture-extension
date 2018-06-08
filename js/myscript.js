class Vector {
  constructor (beginX = 0, beginY = 0, posX = 0, posY = 0) {
    this.beginX = beginX
    this.beginY = beginY
    this.posX = null
    this.posY = null
    this.degree = null
    this.isMouseDown = false
    this.isCanceled = false

    chrome.storage.local.get(value => {
      this.config = value
    })
  }

  begin (x, y) {
    this.beginX = x
    this.beginY = y
    this.isMouseDown = true
    this.isCanceled = false
  }

  move (x, y) {
    this.posX = x
    this.posY = y

    this.radian = this.getRadian()
    this.direction = this.getDirection()
  }

  cancel () {
    this.isCanceled = true
    $('#stroke').remove()
  }

  runCommand () {
    return chrome.runtime.sendMessage({ action: this.config.userMap[this.config.size][this.direction] })
  }

  getRadian () {
    // const x = this.posX - this.beginX
    // const y = this.beginY - this.posY
    const x = this.posX - this.beginX
    const y = this.beginY - this.posY
    return Math.atan2(y, x) < 0 ? Math.PI * 2 + Math.atan2(y, x) : Math.atan2(y, x)
  }

  getDirection () {
    const step = Math.PI / this.config.size
    const degree = step * 2

    let begin = Math.PI * 2 - step
    let end = step

    if (begin < this.radian || this.radian <= end) { return 0 }
    if (this.radian <= end + degree * 1) { return this.config.size - 1 }
    if (this.radian <= end + degree * 2) { return this.config.size - 2 }
    if (this.radian <= end + degree * 3) { return this.config.size - 3 }
    if (this.radian <= end + degree * 4) { return this.config.size - 4 }
    if (this.radian <= end + degree * 5) { return this.config.size - 5 }
    if (this.radian <= end + degree * 6) { return this.config.size - 6 }
    if (this.radian <= end + degree * 7) { return this.config.size - 7 }
  }
}

const vector = new Vector()
let canvas = null
let context = null

const draw = (orthant) => {
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = vector.config.activeRBGA
  context.textAlign = 'center'
  const step = Math.PI / vector.config.size
  const degree = step * 2

  let begin = Math.PI * 2 - step
  let end = step

  for (const i of [...Array(Number(vector.config.size)).keys()]) {
    // context.fillStyle = orthant === i ? vector.config.activeRBGA : vector.config.inactiveRBGA
    context.moveTo(vector.beginX, vector.beginY)
    context.beginPath()
    context.arc(vector.beginX, vector.beginY, vector.config.radius, begin, end, false)
    context.lineTo(vector.beginX, vector.beginY)
    // context.closePath()
    var x2 = vector.beginX + (vector.config.radius - vector.config.size / 6) * Math.cos(Math.PI / vector.config.size * i * 2)
    var y2 = vector.beginY + (vector.config.radius - vector.config.size / 6) * Math.sin(Math.PI / vector.config.size * i * 2)

    if (orthant === i) {
      context.fillStyle = vector.config.activeRBGA
      // context.fill()
      // context.fillStyle = vector.config.textRGBA
      context.font = vector.config.activeFont
      context.fillText(vector.config.userMap[vector.config.size][i], x2, y2)
    } else {
      context.font = vector.config.inactiveFont
      context.fillStyle = vector.config.inactiveRBGA
      context.fillText(vector.config.userMap[vector.config.size][i], x2, y2)
    }
    // context.stroke()

    // const img = new Image()
    // var x2 = vector.beginX + (vector.config.radius-12) * Math.cos(Math.PI / vector.config.size * i * 2)
    // var y2 = vector.beginY + (vector.config.radius-12) * Math.sin(Math.PI / vector.config.size * i * 2)
    // img.src = chrome.extension.getURL(`/img/${vector.config[i]}.png`)
    // context.drawImage(img, x2-12, y2-12)
    begin = end
    end = begin + degree
  }

  context.beginPath()
  context.strokeStyle = vector.config.activeRBGA
  context.moveTo(vector.beginX, vector.beginY)
  context.lineTo(vector.posX, vector.posY)
  context.stroke()
}

$(window).on('contextmenu', function () {
  return false
})

$(window).on('mousedown', function (e) {
  if (e.which !== 3) { return }
  vector.begin(e.clientX, e.clientY)

  // const style = `top: ${e.clientY - vector.config.radius}px; left:${e.clientX - vector.config.radius}px;`
  const width = $(window).width()
  const height = $(window).height()
  const style = `
    position: fixed;
    z-index: 9223372036854775807;
    padding: initial;
    margin: initial;
  `
  $('html').prepend(`<canvas id="stroke" width="${width}" height="${height}" style="${style}"></canvas>`)

  canvas = document.getElementById('stroke')
  context = canvas.getContext('2d')
})

$(window).on('mousemove', function (e) {
  if (vector.isMouseDown) {
    vector.move(e.clientX, e.clientY)
    draw(vector.direction)
  }
})

$(window).on('mouseup', function (e) {
  if (e.which !== 3) { return }
  if (vector.isCanceled) { return }
  vector.isMouseDown = false

  if (vector.beginX === vector.posX && vector.beginY === vector.posY) {

  }
  vector.runCommand()
  $('#stroke').remove()
})

$(window).on('mousedown', function(e) {
  if (e.which !== 1) { return }
  if (!vector.isMouseDown) { return }
  vector.cancel()
})