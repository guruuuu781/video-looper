document.getElementById('loadBtn').addEventListener('click', function () {
  const url = document.getElementById('videoUrl').value.trim();
  const container = document.getElementById('videoContainer');
  container.innerHTML = ''; // Clear previous

  if (!url) {
    alert('Please enter a video URL');
    return;
  }

  // Check if it's a YouTube URL
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let embedUrl;

    if (url.includes('youtu.be')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`;
    } else {
      const videoId = new URL(url).searchParams.get('v');
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`;
    }

    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.title = 'YouTube video player';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    container.appendChild(iframe);

  } else if (url.match(/\.(mp4|webm|ogg)$/i)) {
    // Direct video file (MP4, WebM, etc.)
    const video = document.createElement('video');
    video.src = url;
    video.controls = true;
    video.autoplay = true;
    video.loop = true;
    video.muted = false; // Set to true if autoplay is blocked
    container.appendChild(video);

  } else {
    alert('Unsupported URL. Please use a YouTube link or direct MP4/WebM link.');
  }
});
