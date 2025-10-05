import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChromeExtensionApp } from './components/chrome-extension-app';
import './styles/globals.css';

// Wait for the page to be fully loaded
const initExtension = () => {
  // Check if we're on a GitHub page
  if (!window.location.hostname.includes('github.com')) {
    return;
  }

  // Check if the extension root already exists
  if (document.getElementById('oss-power-tools-root')) {
    return;
  }

  // Create the root element for our extension
  const rootElement = document.createElement('div');
  rootElement.id = 'oss-power-tools-root';
  rootElement.style.cssText = 'position: fixed; top: 0; left: 0; z-index: 10000; pointer-events: none;';
  
  // Make children interactive
  const style = document.createElement('style');
  style.textContent = '#oss-power-tools-root > * { pointer-events: auto; }';
  document.head.appendChild(style);
  
  document.body.appendChild(rootElement);

  // Mount the React app
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <ChromeExtensionApp />
    </StrictMode>
  );
};

// Initialize when the page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExtension);
} else {
  initExtension();
}

// Re-initialize on navigation (for GitHub's SPA)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    // Small delay to let GitHub's page render
    setTimeout(initExtension, 500);
  }
}).observe(document, { subtree: true, childList: true });
