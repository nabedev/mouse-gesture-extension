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
    return command[this.config[this.direction]]()
  }

  getRadian () {
    // const x = this.posX - this.beginX
    // const y = this.beginY - this.posY
    const x = this.posX - this.beginX
    const y = this.beginY - this.posY
    return Math.atan2(y, x) < 0 ? Math.PI * 2 + Math.atan2(y, x) : Math.atan2(y, x)
  }

  getDirection () {
    const step = Math.PI / circle.size
    const degree = step * 2

    let begin = Math.PI * 2 - step
    let end = step

    console.log(this.radian)

    if (begin < this.radian || this.radian <= end) { return 0 }
    if (this.radian <= end + degree*1) { return circle.size - 1 }
    if (this.radian <= end + degree*2) { return circle.size - 2 }
    if (this.radian <= end + degree*3) { return circle.size - 3 }
    if (this.radian <= end + degree*4) { return circle.size - 4 }
    if (this.radian <= end + degree*5) { return circle.size - 5 }
    if (this.radian <= end + degree*6) { return circle.size - 6 }
    if (this.radian <= end + degree*7) { return circle.size - 7 }
  }
}

const vector = new Vector()
let canvas = null
let context = null

const draw = (orthant) => {
  context.clearRect(0, 0, canvas.width, canvas.height)

  const step = Math.PI / circle.size
  const degree = step * 2

  let begin = Math.PI * 2 - step
  let end = step

  for (const i of [...Array(circle.size).keys()]) {
    context.fillStyle = orthant === i ? circle.activeRBGA : circle.inactiveRBGA
    context.beginPath()
    context.arc(circle.radius, circle.radius, circle.radius, begin, end, false)
    context.lineTo(circle.radius, circle.radius)
    context.closePath()
    context.stroke()
    context.fill()

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

  const style = `top: ${e.clientY - circle.radius}px; left:${e.clientX - circle.radius}px;`
  $('body').append('<canvas id="stroke" width="350" height="350" style="position: fixed;' + style + '"></canvas>').fadeIn('slow')

  canvas = document.getElementById('stroke')
  context = canvas.getContext('2d')
  context.fillStyle = 'rgba(253, 253, 253, 0.5)'
  context.strokeStyle = 'rgba(0, 0, 0, 0.1)'

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
  vector.runCommand()
  $('#stroke').remove()
})
