import React from 'react';
import { createRoot } from 'react-dom/client';

const Popup: React.FC = () => {
  const openGitHub = () => {
    chrome.tabs.create({ url: 'https://github.com' });
  };

  const openOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div>
      <button onClick={openGitHub}>Open GitHub</button>
      <button onClick={openOptions}>Options</button>
    </div>
  );
};

// Mount the popup
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Popup />);
}

// Simple script for popup.html
document.getElementById('open-github')?.addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://github.com' });
});

document.getElementById('options')?.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

// Check status
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const statusEl = document.querySelector('#status');
  if (statusEl) {
    const isGitHub = tabs[0]?.url?.includes('github.com');
    if (isGitHub) {
      statusEl.classList.add('status-active');
      statusEl.innerHTML = '<div class="status-title">✓ Active</div><div class="status-text">Extension is running on this GitHub page</div>';
    } else {
      statusEl.innerHTML = '<div class="status-title">⚠ Inactive</div><div class="status-text">Navigate to GitHub.com to use the extension</div>';
    }
  }
});
