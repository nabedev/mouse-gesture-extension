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
chrome.storage.local.set(config, () => {
  console.log('Settings saved')
})

chrome.storage.local.get(config, value => {
  $('#circle-size').text(value.size)
  console.log(value.size)
  for (const x of [...Array(value.size).keys()]) {
    $('.container').append('<div class="row"><div class="col" style="background: blue; color: #fff; text-align: center;">size</div><div class="col"><div class="dropdown"><button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">4</button><div class="dropdown-menu" aria-labelledby="dropdownMenu2"></div></div></div></div>')
  }
})

console.log(document.getElementById('btn'))
$('#btn').text('hogehoge')

$(document).on('click', '#btn', function() {
  console.log('clicked')
  $(this).text('clicked')
})
