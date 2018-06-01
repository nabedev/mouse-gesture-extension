const config = {
  size: 8,
  radius: 100,
  activeRBGA: 'rgba(34,178,218, 1.0)',
  inactiveRBGA: 'rgba(255,255,255, 0)',
  0: 'forward',
  1: 'none',
  2: 'closeTab',
  3: 'restoreTab',
  4: 'back',
  5: 'leftTab',
  6: 'createTab',
  7: 'rightTab'
}

// popup.htmlで選択された時に実行
chrome.storage.local.set(config, () => {})

chrome.storage.local.get(config, value => {
  $('#size').val(value.size)
  draw(value.size)
})

$(document).on('change', 'select#size', function() {
  config.size = $(this).val()
  chrome.storage.local.set(config, () => {})

  draw(config.size)
})

const draw = (count) => {
  $('ul').empty()
  for (const x of [...Array(Number(count)).keys()]) {
    $('ul').append(`
      <ol>
        <div style="display: flex; align-items: center;">
          <div>
            <canvas id="canvas-${x}" width="120" height="120"></canvas>
          </div>
        <div>
        <select id="command">
          <option value="back">back</option>
          <option value="forward">forward</option>
          <option value="4">createTab</option>
          <option value="5">closeTab</option>
          <option value="6">restoreTab</option>
          <option value="7">hoge</option>
          <option value="8">none</option>
        </select>
        </div>
        </div>
      </ol>`
    )

    const canvas = document.getElementById(`canvas-${x}`)
    const context = canvas.getContext('2d')
    // context.clearRect(0, 0, canvas.width, canvas.height)
    context.lineWidth = 2
    const step = Math.PI / config.size
    const degree = step * 2

    let begin = Math.PI * 2 - step
    let end = step

    for (const i of [...Array(Number(count)).keys()]) {
      context.fillStyle = x === i ? config.activeRBGA : config.inactiveRBGA
      // context.moveTo(50, 50)
      context.beginPath()
      context.arc(60, 60, 50, begin, end, false)
      context.lineTo(60, 60)
      context.closePath()
      context.fill()
      context.stroke()

      begin = end
      end = begin + degree
    }
  }
}
