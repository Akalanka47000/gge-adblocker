const setButtonStyles = () => {
  const active = localStorage.getItem('adblocker-active') === 'true';
  const activeIcon = document.getElementById('active-icon');
  const button = document.getElementById('btn-adblocker');
  if (active) {
    activeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />`
    button.style.backgroundColor = '#b91c1c';
  } else {
    activeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M11.412 15.655L9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457L3 3m5.457 5.457l7.086 7.086m0 0L21 21" />`
    button.style.backgroundColor = '#1a1a1a';
  }
}

const toggleActiveStatus = async () => {
  const active = localStorage.getItem('adblocker-active') === 'true';
  localStorage.setItem('adblocker-active', !active);
  await chrome.storage.local.set({
    adblockerActive: !active,
  })
  setButtonStyles(active);
}

const initialize = async () => {
  setButtonStyles()
  document.getElementById('btn-adblocker').addEventListener('click', toggleActiveStatus);
  await chrome.storage.local.set({
    adblockerActive: localStorage.getItem('adblocker-active') === 'true',
  })
}

if (document.readyState !== 'loading') {
  initialize()
} else {
  document.addEventListener('DOMContentLoaded', function () {
    initialize()
  })
}