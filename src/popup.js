document.addEventListener('DOMContentLoaded', () => {
  const opacitySlider = document.getElementById('opacity');
  const opacityValue = document.getElementById('opacityValue');

  opacitySlider.addEventListener('input', () => {
    const value = opacitySlider.value / 100;
    opacityValue.textContent = value.toFixed(2);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'toggleTransparency',
        opacity: value,
      });
    });
  });
});
