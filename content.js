/**
 * This is only for pausing the video once the tab is changed to another tab

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      const video = document.querySelector('video');
      if (video) {
        video.pause();
        }
        }
        });
        
*/

        /*
For resuming back the video once the visibility is back to youtube


document.addEventListener('visibilitychange', () => {
    const video = document.querySelector('video');
    if (video) {
        if (document.hidden) {
        video.pause();
        } else {
        video.play();
}
}
});


*/


/*
    This is for exception cases for musics
    // works fine but the exceptions are being hardcoded 
    


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
    // Example logic for exceptions
    const videoTitle = document.title; // Get the current video title
    const exceptions = [
        'Relaxing Music', // Example: don't pause videos with these titles
        'Soothing Nature Sounds',
        'Official Music Video',
        'Video Song'
        ];
        
        // Check if the current video title is in the exceptions list
    return !exceptions.some(exception => videoTitle.includes(exception));
    }
    
*/


/*
    For exception cases for musics and with wide range of exceptionals 
    - Working fine but gives error
        - const videoCategory = document.querySelector('meta[itemprop="genre"]').content;
        
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
    const videoTitle = document.querySelector('h1.title').innerText;
    const videoCategory = document.querySelector('meta[itemprop="genre"]').content;
    const videoDescription = document.querySelector('meta[name="description"]').content;
  
    // Example logic for exceptions
    const musicKeywords = [
        'song', 'music', 'album', 'track', 'lyrics', 'official'
        ];
        
        // Check if the video title or description contains music-related keywords
    const isMusicVideo = musicKeywords.some(keyword => 
      videoTitle.toLowerCase().includes(keyword) || 
      videoDescription.toLowerCase().includes(keyword)
      );
      
      // Check if the video category is related to music
      const musicCategories = [
        'Music', 'Entertainment'
        ];
        const isMusicCategory = musicCategories.includes(videoCategory);
  
        // If the video is classified as music, do not handle pause
        return !(isMusicVideo || isMusicCategory);
        }
        

*/

/*
    For exception cases for musics and with wide range of exceptionals   
*/
document.addEventListener('DOMContentLoaded', () => {
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
        return true; // Default to handling pause if elements are not found
      }
  
      const videoTitle = videoTitleElement.innerText;
      const videoDescription = videoDescriptionElement.content;
  
      // Parse JSON-LD structured data for the video category
      let videoCategory = '';
      const videoData = JSON.parse(jsonLd.textContent);
      if (videoData && videoData.genre) {
        videoCategory = videoData.genre;
      }
  
      // Example logic for exceptions
      const musicKeywords = [
        'song', 'music', 'album', 'track', 'lyrics', 'official'
      ];
  
      // Check if the video title or description contains music-related keywords
      const isMusicVideo = musicKeywords.some(keyword => 
        videoTitle.toLowerCase().includes(keyword) || 
        videoDescription.toLowerCase().includes(keyword)
      );
  
      // Check if the video category is related to music
      const musicCategories = [
        'Music', 'Entertainment'
      ];
      const isMusicCategory = musicCategories.includes(videoCategory);
  
      // If the video is classified as music, do not handle pause
      return !(isMusicVideo || isMusicCategory);
    }
  });
  