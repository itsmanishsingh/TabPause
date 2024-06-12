// chrome.tabs.onActivated.addListener(activeInfo => {
//     chrome.tabs.get(activeInfo.tabId, (tab) => {
//       if (tab.url.includes('youtube.com')) {
//         chrome.scripting.executeScript({
//           target: { tabId: tab.id },
//           function: pauseVideoOnBlur
//         });
//       }
//     });
//   });
  
//   chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === 'complete' && tab.url.includes('youtube.com')) {
//       chrome.scripting.executeScript({
//         target: { tabId: tabId },
//         function: pauseVideoOnBlur
//       });
//     }
//   });
  
//   function pauseVideoOnBlur() {
//     document.addEventListener('visibilitychange', () => {
//       const video = document.querySelector('video');
//       if (document.hidden && video && !video.paused) {
//         video.pause();
//       }
//     });
//   }

// 


/*
For resuming back the video once the visibility is back to youtube
*/


chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (tab.url.includes('youtube.com')) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: checkVisibility
        });
      }
    });
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('youtube.com')) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: checkVisibility
      });
    }
  });
  
  function checkVisibility() {
    // This function can be empty, as content.js will handle visibility changes
  }
  