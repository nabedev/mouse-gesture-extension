// console.log('command.js')

const command = {
  back: () => { window.history.back() },
  forward: () => { window.history.forward() },
  remobeTab: () => { chrome.runtime.sendMessage({ action: 'removeTab' }) },
  createTab: () => { chrome.runtime.sendMessage({ action: 'createTab' }) }
}

const circle = {
  size: 4,
  radius: 100,
  activeRBGA: 'rgba(48,227,202, 1.0)',
  inactiveRBGA: 'rgba(255,255,255, 0.9)'
}