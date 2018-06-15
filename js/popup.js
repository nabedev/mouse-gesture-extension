const gestureNames = ['Back', 'Forward', 'LeftTab', 'RightTab', 'NewTab', 'CloseTab', 'RestoreTab', 'Cancel']

const defaultConfig = {
  size: 8,
  radius: 100,
  activeRBGA: 'rgba(34,178,218,1)',
  inactiveRBGA: 'rgba(0,0,0,1)',
  textRGBA: 'rgba(255,253,116,1)',
  activeFont: "italic bold 14px 'Arial'",
  inactiveFont: "italic bold 12px 'Arial'",
  userMap: {
    8: {
      0: 'Forward',
      1: 'Cancel',
      2: 'CloseTab',
      3: 'RestoreTab',
      4: 'Back',
      5: 'LeftTab',
      6: 'NewTab',
      7: 'RightTab'
    },
    7: {
      0: 'Forward',
      1: 'Cancel',
      2: 'CloseTab',
      3: 'RestoreTab',
      4: 'Back',
      5: 'LeftTab',
      6: 'NewTab'
    },
    6: {
      0: 'Forward',
      1: 'Cancel',
      2: 'CloseTab',
      3: 'RestoreTab',
      4: 'Back',
      5: 'LeftTab'
    },
    5: {
      0: 'Forward',
      1: 'Cancel',
      2: 'CloseTab',
      3: 'RestoreTab',
      4: 'Back'
    },
    4: {
      0: 'Forward',
      1: 'CloseTab',
      2: 'Back',
      3: 'NewTab'
    },
    3: {
      0: 'Forward',
      1: 'Back',
      2: 'NewTab'
    },
    2: {
      0: 'Forward',
      1: 'Back'
    }
  }
}
let userConfig

chrome.storage.local.get(value => {
  if (!Object.keys(value).length) {
    chrome.storage.local.set(defaultConfig, item => { userConfig = item })
  }
  else {
    userConfig = value
  }

  $('#size').val(userConfig.size)
  draw()
})

// ジェスチャー数変更
$(document).on('change', 'select#size', function() {
  userConfig.size = $(this).val()
  chrome.storage.local.set(userConfig, () => {})

  draw(userConfig.size)
})

$(document).on('change', 'select.command', function() {
  const area = $(this).attr('name')
  userConfig.userMap[userConfig.size][area] = $(this).val()
  chrome.storage.local.set(userConfig, () => {})
})

const setOptionSelected = () => {
  for (const i of [...Array(Number(userConfig.size)).keys()]) {
    $(`select.command[name="${i}"] > option:contains('${userConfig.userMap[userConfig.size][i]}')`).attr('selected', 'selected')
  }
}

const draw = () => {
  $('#setting').empty()
  for (const i of [...Array(Number(userConfig.size)).keys()]) {
    let option = ''
    for (const name of gestureNames) {
      option += `<option>${name}</option>`
    }
    $('#setting').append(`
      <div class="flex">
        <div>
          <canvas id="canvas-${i}" width="120" height="120"></canvas>
        </div>
        <div>
          <select class="command" name="${i}">
            ${option}
          </select>
        </div>
      </div>
    `)

    // 現在設定しているコマンド名をselectedにする
    setOptionSelected()

    const canvas = document.getElementById(`canvas-${i}`)
    const context = canvas.getContext('2d')
    context.lineWidth = 1.5
    context.fillStyle = userConfig.activeRBGA
    const step = Math.PI / userConfig.size
    const degree = step * 2

    let begin = Math.PI * 2 - step
    let end = step

    for (const j of [...Array(Number(userConfig.size)).keys()]) {
      context.beginPath()
      context.arc(60, 60, 50, begin, end, false)
      context.lineTo(60, 60)
      if (i === j) {
        context.fill()
      }
      context.stroke()
      begin = end
      end = begin + degree
    }
  }
}
