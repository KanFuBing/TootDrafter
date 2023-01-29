chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && !tab.url.includes('chrome://') && !tab.url.includes('chrome.google.com')) {
        chrome.scripting.executeScript({
            target: { tabId },
            files: ['./foreground.js']
        })
    }
})
