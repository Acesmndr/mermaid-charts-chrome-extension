chrome.browserAction.onClicked.addListener(function(activeTab) {
  console.log(activeTab);
  chrome.tabs.executeScript({
    file: 'assets/contentscript.js',
    allFrames : true,
    matchAboutBlank: true,
  });
  chrome.browserAction.setBadgeBackgroundColor({
    color: '#1AA260',
    tabId: activeTab.id,
  }, () => {
    chrome.browserAction.setBadgeText({
      text: '✓',
      tabId: activeTab.id,
    });
  });
});
