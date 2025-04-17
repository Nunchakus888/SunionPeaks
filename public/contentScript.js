// BOSS直聘 Content Script
// This script runs on https://www.zhipin.com/* pages

// Check if user is logged in
function checkLoginStatus() {
  try {
    // More reliable ways to check if logged in
    const userAvatar = document.querySelector('.user-nav') || document.querySelector('.user-info');
    const loginButton = document.querySelector('.btn-login');
    const bossNav = document.querySelector('.boss-nav-container');
    const myMenu = document.querySelector('.nav-item.identity-boss');
    
    // Look for elements that clearly indicate user is logged in
    const isLoggedIn = (Boolean(userAvatar) && !Boolean(loginButton)) || 
                       Boolean(bossNav) || 
                       Boolean(myMenu);
    
    // Check cookies as additional verification
    const hasBstCookie = document.cookie.includes('bst=');
    const hasToken = document.cookie.includes('token=');
    const hasCookieAuth = hasBstCookie || hasToken;
    
    console.log('Login indicators:', { 
      userAvatar: Boolean(userAvatar), 
      loginButton: Boolean(loginButton),
      bossNav: Boolean(bossNav),
      myMenu: Boolean(myMenu),
      hasBstCookie,
      hasToken
    });
    
    // Store login status in local storage
    const loginStatus = {
      isLoggedIn: isLoggedIn || hasCookieAuth,
      timestamp: Date.now(),
      url: window.location.href,
      indicators: {
        domElements: isLoggedIn,
        cookies: hasCookieAuth
      }
    };
    
    console.log('Final login status:', loginStatus);
    
    // Store in local storage
    if (chrome && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ 'bossLoginStatus': loginStatus }, () => {
        if (chrome.runtime.lastError) {
          console.error('Error storing login status:', chrome.runtime.lastError);
        }
      });
    
      // Send message to the extension
      try {
        chrome.runtime.sendMessage({
          type: 'LOGIN_STATUS_UPDATE',
          data: loginStatus
        });
      } catch (error) {
        console.log('Error sending message to extension', error);
      }
    }
    
    return loginStatus;
  } catch (error) {
    console.error('Error in checkLoginStatus:', error);
    return { isLoggedIn: false, error: error.message };
  }
}

// Delay initial check to ensure page is loaded
setTimeout(() => {
  const loginStatus = checkLoginStatus();
  console.log('BOSS直聘 Login Status:', loginStatus);
}, 1000);

// Set up a listener to check login status when requested
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'CHECK_LOGIN_STATUS') {
    console.log('Login status check requested');
    setTimeout(() => {
      const status = checkLoginStatus();
      sendResponse(status);
    }, 500);
    return true; // Indicates we'll respond asynchronously
  }
});

// Watch for DOM changes that might indicate login state changes
const setupObserver = () => {
  try {
    const observer = new MutationObserver((mutations) => {
      let shouldCheck = false;
      
      for (const mutation of mutations) {
        // Check for changes to important elements
        if (mutation.target.classList && 
           (mutation.target.classList.contains('user-nav') || 
            mutation.target.classList.contains('user-info') ||
            mutation.target.classList.contains('btn-login') ||
            mutation.target.classList.contains('boss-nav-container'))) {
          shouldCheck = true;
          break;
        }
        
        // Check for adding/removing nodes that could affect login state
        if (mutation.type === 'childList' && 
           (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
          shouldCheck = true;
          break;
        }
      }
      
      if (shouldCheck) {
        console.log('DOM changes detected, rechecking login status');
        checkLoginStatus();
      }
    });

    // Start observing body for all changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'id']
    });
    
    console.log('Observer set up successfully');
    
    return observer;
  } catch (error) {
    console.error('Error setting up observer:', error);
    return null;
  }
};

// Start observing once DOM is fully loaded
let observer = null;
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    observer = setupObserver();
    checkLoginStatus();
  });
} else {
  observer = setupObserver();
  checkLoginStatus();
}

// Also check on any navigation change
window.addEventListener('load', checkLoginStatus);
window.addEventListener('popstate', checkLoginStatus);

// Set up a periodic check every 30 seconds
setInterval(checkLoginStatus, 30000); 