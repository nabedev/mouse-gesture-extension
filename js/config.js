// console.log('command.js')

const command = {
  back: () => { window.history.back() },
  forward: () => { window.history.forward() },
  remobeTab: () => { chrome.runtime.sendMessage({ action: 'removeTab' }) },
  createTab: () => { chrome.runtime.sendMessage({ action: 'createTab' }) },
  none: () => { return null }
}

// const circle = {
//   size: 8,
//   radius: 100,
//   activeRBGA: 'rgba(122,8,250, 0.8)',
//   inactiveRBGA: 'rgba(255,255,255, 0.5)'
// }
