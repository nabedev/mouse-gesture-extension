class Vector {
  constructor (beginX = 0, beginY = 0, posX = 0, posY = 0) {
    this.beginX = beginX
    this.beginY = beginY
    this.posX = null
    this.posY = null
    this.degree = null
    this.isMouseDown = false

    chrome.storage.local.get(null, value => {
      this.config = value
    })
  }

  begin (x, y) {
    this.beginX = x
    this.beginY = y
    this.isMouseDown = true
  }

  move (x, y) {
    this.posX = x
    this.posY = y

    this.radian = this.getRadian()
    this.direction = this.getDirection()
  }

  runCommand () {
    // return command[this.config[this.direction]]()
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

  const step = Math.PI / vector.config.size
  const degree = step * 2

  let begin = Math.PI * 2 - step
  let end = step

  for (const i of [...Array(vector.config.size).keys()]) {
    context.fillStyle = orthant === i ? vector.config.activeRBGA : vector.config.inactiveRBGA
    // context.moveTo(vector.beginX, vector.beginY)
    context.beginPath()
    context.arc(vector.beginX, vector.beginY, vector.config.radius, begin, end, false)
    context.lineTo(vector.beginX, vector.beginY)
    context.closePath()
    context.fill()

    const img = new Image()
    var x2 = vector.beginX + (vector.config.radius-12) * Math.cos(Math.PI / vector.config.size * i * 2)
    var y2 = vector.beginY + (vector.config.radius-12) * Math.sin(Math.PI / vector.config.size * i * 2)
    img.src = chrome.extension.getURL(`/img/${vector.config[i]}.png`)
    context.drawImage(img, x2-12, y2-12)

    begin = end
    end = begin + degree
  }
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
  $('html').prepend(`<canvas id="stroke" width="${width}" height="${height}" style="position: fixed; z-index: 9223372036854775807; padding: initial; margin: initial"></canvas>`)

  canvas = document.getElementById('stroke')
  context = canvas.getContext('2d')

  draw()
})

$(window).on('mousemove', function (e) {
  if (vector.isMouseDown) {
    vector.move(e.clientX, e.clientY)
    draw(vector.direction)
  }
})

$(window).on('mouseup', function (e) {
  if (e.which !== 3) { return }
  vector.isMouseDown = false
  vector.runCommand()
  $('#stroke').remove()
})
