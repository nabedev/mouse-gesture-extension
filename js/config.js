// console.log('command.js')

const command = {
  Back: () => { window.history.back() },
  Forward: () => { window.history.forward() },
  RemobeTab: () => { chrome.runtime.sendMessage({ action: 'removeTab' }) },
  NewTab: () => { chrome.runtime.sendMessage({ action: 'NewTab' }) },
  None: () => { return null }
}

// const circle = {
//   size: 8,
//   radius: 100,
//   activeRBGA: 'rgba(122,8,250, 0.8)',
//   inactiveRBGA: 'rgba(255,255,255, 0.5)'
// }
