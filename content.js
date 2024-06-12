// document.addEventListener('visibilitychange', () => {
//     if (document.hidden) {
//       const video = document.querySelector('video');
//       if (video) {
//         video.pause();
//       }
//     }
//   });


// For resuming back the video once the visibility is back to youtube


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
  
  