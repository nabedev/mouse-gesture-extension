const config = {
  right: 'forward',
  left: 'back',
  up: 'createTab',
  down: 'remobeTab',
  rightUp: 'rightTab',
  leftUp: 'leftTab',
  rightDow: 'reload'
}

// popup.htmlで選択された時に実行
chrome.storage.local.set(config, () => {
  console.log('Settings saved')
})

chrome.storage.local.get(null, value => {
  console.log(value)
})

console.log(document.getElementById('btn'))
$('#btn').text('hogehoge')

$(document).on('click', '#btn', function() {
  console.log('clicked')
  $(this).text('clicked')
})
