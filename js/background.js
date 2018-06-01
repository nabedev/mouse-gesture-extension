// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request && request.action === 'createWindow') {
//     chrome.tabs.getSelected(tab => {
//       // chrome.tabs.remove(tab.id, function() { })
//       return tab.id
//     })
//   }
// })

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'removeTab':
      chrome.tabs.getSelected(tab => { chrome.tabs.remove(tab.id) })
      break
    case 'createTab':
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
