document.addEventListener('DOMContentLoaded', async function () {
  const slider = document.getElementById('opacity');
  const opacityInput = document.getElementById('opacityInput');
  const resetButton = document.getElementById('reset');
  const applyButton = document.getElementById('apply');
  const halfOpacityButton = document.getElementById('half-opacity');
  const threeQuartersOpacityButton = document.getElementById(
    'three-quarters-opacity'
  );

  // 获取活动标签页ID和初始化面板
  let activeTabId = null;

  try {
    // 尝试从storage获取标签页ID（用于快捷键场景）
    const result = await chrome.storage.local.get(['activeTabId']);
    if (result.activeTabId) {
      activeTabId = result.activeTabId;
      // 使用完后清除
      await chrome.storage.local.remove('activeTabId');
    } else {
      // 常规popup场景
      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      activeTabId = tabs[0].id;
    }

    // 获取当前的透明度设置
    const response = await chrome.tabs.sendMessage(activeTabId, {
      action: 'getOpacity',
    });

    if (response && response.currentOpacity) {
      // 显示图片的透明度值
      syncValues(response.currentOpacity * 100);
    } else {
      // 使用默认值
      syncValues(22); // 图片默认值
    }
  } catch (error) {
    console.error('Error initializing popup:', error);
    return;
  }

  // 同步滑块和输入框的值
  function syncValues(value) {
    slider.value = value;
    opacityInput.value = value;
  }

  // 应用透明度的通用函数
  async function applyOpacity(opacity) {
    try {
      await chrome.tabs.sendMessage(activeTabId, {
        action: 'setOpacity',
        opacity: opacity.toString(),
      });
      syncValues(opacity * 100);
    } catch (error) {
      console.error('Error applying opacity:', error);
    }
  }

  // 应用按钮
  applyButton.addEventListener('click', async function () {
    const opacity = slider.value / 100;
    await applyOpacity(opacity);
  });

  // 50%透明度按钮
  halfOpacityButton.addEventListener('click', async function () {
    await applyOpacity(0.5);
  });

  // 75%透明度按钮
  threeQuartersOpacityButton.addEventListener('click', async function () {
    await applyOpacity(0.75);
  });

  // 重置按钮
  resetButton.addEventListener('click', async function () {
    try {
      await chrome.tabs.sendMessage(activeTabId, {
        action: 'resetOpacity',
      });
      syncValues(100);
    } catch (error) {
      console.error('Error resetting opacity:', error);
    }
  });

  // 更新滑块值
  slider.addEventListener('input', function () {
    syncValues(this.value);
  });

  // 处理手动输入
  opacityInput.addEventListener('input', function () {
    let value = parseInt(this.value);
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    syncValues(value);
  });
});
