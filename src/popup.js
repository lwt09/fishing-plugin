document.addEventListener('DOMContentLoaded', function () {
  const slider = document.getElementById('opacity');
  const opacityInput = document.getElementById('opacityInput');
  const resetButton = document.getElementById('reset');
  const applyButton = document.getElementById('apply');

  // 页面加载时自动应用 0.1 透明度
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'setOpacity',
      opacity: '0.1',
    });
  });

  // 同步滑块和输入框的值
  function syncValues(value) {
    slider.value = value;
    opacityInput.value = value;
  }

  // 更新滑块值
  slider.addEventListener('input', function () {
    syncValues(this.value);
  });

  // 处理手动输入
  opacityInput.addEventListener('input', function () {
    let value = parseInt(this.value);
    // 限制输入范围
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    syncValues(value);
  });

  // 应用新的透明度
  applyButton.addEventListener('click', function () {
    const opacity = slider.value / 100;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'setOpacity',
        opacity: opacity.toString(),
      });
    });
  });

  // 重置透明度
  resetButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'resetOpacity',
      });
    });
  });
});
