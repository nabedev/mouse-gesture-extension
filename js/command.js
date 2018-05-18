// console.log('command.js')

const command = {
  back: () => { window.history.back() },
  forward: () => { window.history.forward() },
  remobeTab: () => { chrome.runtime.sendMessage({ action: 'removeTab' }) },
  createTab: () => { chrome.runtime.sendMessage({ action: 'createTab' }) }
}
