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

*/



// Function to execute content script
function executeContentScript(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: checkVisibility
  }, (results) => {
    if (chrome.runtime.lastError) {
      console.error(`Error executing script: ${chrome.runtime.lastError.message}`);
    } else if (results.length === 0) {
      console.error('No frame found in tab');
    } else if (results[0].error) {
      console.error(`Script execution error: ${results[0].error.message}`);
    }
  });
}

// Helper function to fetch and execute content script
function fetchAndExecuteContentScript(tabId) {
  chrome.tabs.get(tabId, (tab) => {
    if (chrome.runtime.lastError) {
      console.error(`Error getting tab: ${chrome.runtime.lastError.message}`);
      return;
    }
    if (tab && tab.url && tab.url.includes('youtube.com')) {
      executeContentScript(tabId);
    }
  });
}

// Listener for tab activation events
chrome.tabs.onActivated.addListener(activeInfo => {
  fetchAndExecuteContentScript(activeInfo.tabId);
});

// Listener for tab update events
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    fetchAndExecuteContentScript(tabId);
  }
});

// Content script function (content.js)
function checkVisibility() {
  document.addEventListener('visibilitychange', () => {
    const video = document.querySelector('video');
    if (video) {
      const shouldPause = shouldHandlePause();
      if (document.hidden && shouldPause) {
        video.pause();
      } else if (!document.hidden && shouldPause) {
        video.play();
      }
    }
  });

  function shouldHandlePause() {
    const videoTitleElement = document.querySelector('h1.title');
    const videoDescriptionElement = document.querySelector('meta[name="description"]');
    const jsonLd = document.querySelector('script[type="application/ld+json"]');

    if (!videoTitleElement || !videoDescriptionElement || !jsonLd) {
      console.warn('Required elements not found in the DOM.');
      return true; 
    }

    const videoTitle = videoTitleElement.innerText;
    const videoDescription = videoDescriptionElement.content;

   
    let videoCategory = '';
    const videoData = JSON.parse(jsonLd.textContent);
    if (videoData && videoData.genre) {
      videoCategory = videoData.genre;
    }


    const musicKeywords = [
      'song', 'music', 'album', 'track', 'lyrics', 'official'
    ];

    // Checking if the video title or description contains music-related keywords
    const isMusicVideo = musicKeywords.some(keyword => 
      videoTitle.toLowerCase().includes(keyword) || 
      videoDescription.toLowerCase().includes(keyword)
    );

    // Checking  if the video category is related to music
    const musicCategories = [
      'Music', 'Entertainment'
    ];
    const isMusicCategory = musicCategories.includes(videoCategory);

    // If the video is classified as music, then skip the pause 
    return !(isMusicVideo || isMusicCategory);
  }
}
