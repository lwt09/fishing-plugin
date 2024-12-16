chrome.action.onClicked.addListener(async (tab) => {
  console.log(`tab: ${tab}`);
  toggleTransparency(tab, 'click');
});

chrome.commands.onCommand.addListener((command, tab) => {
  console.log(`command: ${command}`);
  if (command === 'toggle-transparency') {
    toggleTransparency(tab, 'command');
  }
});

async function toggleTransparency(tab, triggerType) {
  console.log(`[background-runtime] triggerType: ${triggerType}`);
  // 先设置初始透明度
  await chrome.tabs.sendMessage(tab.id, {
    action: 'setOpacity',
    opacity: '0.1',
  });

  // 等待透明度设置完成后再打开面板
  chrome.windows.create({
    url: 'popup.html',
    type: 'popup',
    width: 300,
    height: 200,
  });
}
