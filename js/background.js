// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request && request.action === 'createWindow') {
//     chrome.tabs.getSelected(tab => {
//       // chrome.tabs.remove(tab.id, function() { })
//       return tab.id
//     })
//   }
// })
// reload,

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'Back':
      chrome.tabs.executeScript(null, { code: 'window.history.back()' })
      break
    case 'Forward':
      chrome.tabs.executeScript(null, { code: 'window.history.forward()' })
      break
    case 'RemoveTab':
      chrome.tabs.getSelected(tab => { chrome.tabs.remove(tab.id) })
      break
    case 'NewTab':
      chrome.tabs.create({})
      break
  }
  // if (request && request.action === 'createWindow') {
  //   chrome.tabs.getSelected(tab => {
  //     // chrome.tabs.remove(tab.id, function() { })
  //     console.log(tab)
  //     return tab.id
  //   })
  // }
})
