// Background script for BOSS Recruitment Assistant

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle login status updates from content script
  if (message.type === 'LOGIN_STATUS_UPDATE') {
    // Store the login status
    chrome.storage.local.set({ 'bossLoginStatus': message.data });
  }
});

// When extension icon is clicked, check if we're on zhipin.com
chrome.action.onClicked.addListener(async (tab) => {
  // Safely check if tab has url property and it includes zhipin.com
  if (tab && tab.url && !tab.url.includes('zhipin.com')) {
    chrome.tabs.create({ url: 'https://www.zhipin.com/' });
  }
});

// Check login status when the extension starts
async function checkLoginStatus() {
  try {
    // Get active tab
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // If active tab exists and is on zhipin.com, check login status
    if (tabs && tabs.length > 0 && tabs[0] && tabs[0].url && tabs[0].url.includes('zhipin.com')) {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'CHECK_LOGIN_STATUS' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message:', chrome.runtime.lastError);
          return;
        }
        
        if (response) {
          chrome.storage.local.set({ 'bossLoginStatus': response });
        }
      });
    }
  } catch (error) {
    console.error('Error checking login status:', error);
  }
}

// Listen for tab updates to check login status when navigating
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Make sure tab and tab.url exist before checking
  if (changeInfo.status === 'complete' && tab && tab.url && tab.url.includes('zhipin.com')) {
    // Wait a moment for the page to fully render
    setTimeout(() => {
      chrome.tabs.sendMessage(tabId, { type: 'CHECK_LOGIN_STATUS' }, (response) => {
        // Handle potential errors when sending message
        if (chrome.runtime.lastError) {
          console.log('Error sending message:', chrome.runtime.lastError);
          return;
        }
      });
    }, 1000);
  }
});

// Check login status when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  // Give some time for the extension to initialize before checking
  setTimeout(checkLoginStatus, 1000);
});

// Check login status when a tab becomes active
chrome.tabs.onActivated.addListener(() => {
  // Give some time for the tab to fully load before checking
  setTimeout(checkLoginStatus, 500);
}); 