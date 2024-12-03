let isTransparent = false;

function toggleTransparency(opacity = 0.5) {
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    img.style.opacity = isTransparent ? '1' : opacity.toString();
  });
  isTransparent = !isTransparent;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleTransparency') {
    toggleTransparency(request.opacity);
    sendResponse({ status: 'done' });
  }
});
