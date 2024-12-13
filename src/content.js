// 监听来自 popup 和 background 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'setOpacity') {
    const elements = [
      ...document.getElementsByTagName('img'),
      ...document.getElementsByTagName('video'),
    ];

    elements.forEach((el) => {
      el.style.opacity = request.opacity;
      el.dataset.transparencyToggled = 'true';
    });

    sendResponse({ success: true });
  } else if (request.action === 'resetOpacity') {
    const elements = document.querySelectorAll('[data-transparency-toggled]');
    elements.forEach((el) => {
      el.style.opacity = '1';
      delete el.dataset.transparencyToggled;
    });

    sendResponse({ success: true });
  }
  return true;
});
