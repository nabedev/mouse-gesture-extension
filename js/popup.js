const config = {
  0: 'createTab',
  1: 'createTab',
  2: 'createTab',
  3: 'createTab',
  4: 'createTab',
  5: 'createTab',
  6: 'createTab',
  7: 'createTab'
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
