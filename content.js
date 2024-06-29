
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
      return true; 
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
