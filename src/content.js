// 存储当前透明度的全局变量
let currentOpacity = 1;

// 应用透明度到视频元素的函数
function applyVideoOpacity(video, opacity) {
  // 设置视频元素的样式
  video.style.setProperty('opacity', opacity, 'important');
  video.style.setProperty('-webkit-opacity', opacity, 'important');
  video.style.setProperty('-moz-opacity', opacity, 'important');

  // 设置视频容器的样式
  let videoContainer = video.closest(
    '[class*="video-container"], [class*="player"], [class*="video-wrapper"]'
  );
  if (videoContainer) {
    videoContainer.style.setProperty('opacity', opacity, 'important');
  }
}

// 监听视频事件的函数
function addVideoEventListeners(video) {
  const events = [
    'loadeddata',
    'play',
    'playing',
    'seeked',
    'timeupdate',
    'canplay',
    'loadedmetadata',
  ];

  events.forEach((eventName) => {
    video.addEventListener(eventName, () => {
      if (currentOpacity !== 1) {
        applyVideoOpacity(video, currentOpacity);
      }
    });
  });
}

// 创建和更新样式的函数
function updateOrCreateStyle(opacity) {
  let styleEl = document.getElementById('transparency-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'transparency-style';
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = `
    /* 基础元素 */
    html body img,
    html body video,
    html body iframe,
    html body canvas,
    html body svg {
      opacity: ${opacity} !important;
      -webkit-opacity: ${opacity} !important;
      -moz-opacity: ${opacity} !important;
      -webkit-transition: opacity 0.3s ease !important;
      transition: opacity 0.3s ease !important;
    }

    /* 视频播放器容器 */
    html body .video-container,
    html body .video-player,
    html body [class*="video-player"],
    html body [class*="video-container"],
    html body [class*="player-container"],
    html body [class*="video-wrapper"],
    html body [class*="player"],
    html body [id*="player"],
    html body [class*="video"],
    html body [id*="video"] {
      opacity: ${opacity} !important;
      -webkit-opacity: ${opacity} !important;
      -moz-opacity: ${opacity} !important;
    }

    /* 视频控件 */
    html body video::-webkit-media-controls {
      opacity: ${opacity} !important;
    }
  `;
}

// 设置 MutationObserver 来监听新添加的视频元素
function setupVideoObserver() {
  if (window._videoObserver) {
    window._videoObserver.disconnect();
  }

  window._videoObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeName === 'VIDEO') {
          applyVideoOpacity(node, currentOpacity);
          addVideoEventListeners(node);
        }
        // 检查新添加节点内的视频元素
        const videos =
          node.getElementsByTagName && node.getElementsByTagName('video');
        if (videos) {
          Array.from(videos).forEach((video) => {
            applyVideoOpacity(video, currentOpacity);
            addVideoEventListeners(video);
          });
        }
      });
    });
  });

  window._videoObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// 消息监听处理
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'setOpacity') {
    currentOpacity = request.opacity;

    // 更新全局样式
    updateOrCreateStyle(currentOpacity);

    // 处理所有视频元素
    const videos = document.getElementsByTagName('video');
    Array.from(videos).forEach((video) => {
      applyVideoOpacity(video, currentOpacity);
      addVideoEventListeners(video);
    });

    // 设置观察器
    setupVideoObserver();

    sendResponse({ success: true });
  } else if (request.action === 'resetOpacity') {
    currentOpacity = 1;

    // 停止观察器
    if (window._videoObserver) {
      window._videoObserver.disconnect();
      window._videoObserver = null;
    }

    // 移除样式标签
    const styleEl = document.getElementById('transparency-style');
    if (styleEl) {
      styleEl.remove();
    }

    // 重置所有元素的样式
    const elements = document.querySelectorAll(
      'video, img, iframe, canvas, svg, [class*="video-player"], [class*="player-container"]'
    );
    elements.forEach((element) => {
      element.style.removeProperty('opacity');
      element.style.removeProperty('-webkit-opacity');
      element.style.removeProperty('-moz-opacity');
      element.style.removeProperty('transition');
      element.style.removeProperty('-webkit-transition');
    });

    sendResponse({ success: true });
  } else if (request.action === 'getOpacity') {
    sendResponse({ currentOpacity });
  }
  return true;
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  // 如果存在已保存的透明度，则应用它
  if (currentOpacity !== 1) {
    updateOrCreateStyle(currentOpacity);
    setupVideoObserver();
  }
});
