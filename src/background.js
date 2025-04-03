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

  if (triggerType === 'command') {
    // 存储当前标签页ID，供popup使用
    await chrome.storage.local.set({ activeTabId: tab.id });

    // 创建新窗口
    await chrome.windows.create({
      url: 'popup.html',
      type: 'popup',
      width: 300,
      height: 200,
    });

    // 设置初始透明度为15%
    await chrome.tabs.sendMessage(tab.id, {
      action: 'setOpacity',
      opacity: '0.15',
    });
  }
}
