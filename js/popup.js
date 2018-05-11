const commands = {
  
}


const config = {
  right: 'go',
  left: 'back',
  up: '',
  down: '',
  rightUp: '',
  leftUp: '',
  rightDown: '',
  leftDown: ''
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
