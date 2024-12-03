chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, {
    action: 'toggleTransparency',
    opacity: 0.5,
  });
});
