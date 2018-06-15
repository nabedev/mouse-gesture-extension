chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'Back':
      chrome.tabs.executeScript(null, { code: 'window.history.back()' })
      break
    case 'Forward':
      chrome.tabs.executeScript(null, { code: 'window.history.forward()' })
      break
    case 'CloseTab':
      chrome.tabs.getSelected(tab => { chrome.tabs.remove(tab.id) })
      break
    case 'RestoreTab':
      chrome.sessions.restore()
      break
    case 'NewTab':
      chrome.tabs.create({})
      break
    case 'RightTab':
      chrome.tabs.query({ currentWindow: true }, tabs => {
        const activeTab = tabs.filter(item => item.active)
        const targetIndex = activeTab[0].index + 1 >= tabs.length
          ? 0
          : activeTab[0].index + 1

        chrome.tabs.update(tabs[targetIndex].id, { selected: true })
      })
      break
    case 'LeftTab':
      chrome.tabs.query({ currentWindow: true }, tabs => {
        const activeTab = tabs.filter(item => item.active)
        const targetIndex = activeTab[0].index - 1 < 0
          ? tabs.length - 1
          : activeTab[0].index - 1

        chrome.tabs.update(tabs[targetIndex].id, { selected: true })
      })
      break
  }
})
