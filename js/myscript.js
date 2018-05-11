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
    if (this.degree < 0) { this.degree = this.degree + 360 }

    console.log(this.getDirection())

    chrome.storage.local.get(null, value => {
      console.log(value)
    })
  }

  getRadian () {
    const x = this.endX - this.startX
    const y = this.startY - this.endY
    return Math.atan2(y, x)
  }

  getDirection () {
    if (this.degree > 337.5 || (this.degree >= 0 && this.degree <= 22.5)) { return this.config.right }
    if (this.degree <= 67.5) { return this.config.rightUp }
    if (this.degree <= 112.5) { return this.config.up }
    if (this.degree <= 157.5) { return this.config.leftUp }
    if (this.degree <= 202.5) { return this.config.left }
    if (this.degree <= 247.5) { return this.config.leftDown }
    if (this.degree <= 292.5) { return this.config.down }
    if (this.degree <= 337.5) { return this.config.rightDown }
  }
}

const vector = new Vector()

$(window).on('contextmenu', function () {
  return false
})

$(window).on('mousedown', function (e) {
  if (e.which !== 3) { return }
  vector.start(e.clientX, e.clientY)
})

$(window).on('mouseup', function (e) {
  if (e.which !== 3) { return }
  vector.end(e.clientX, e.clientY)
})
