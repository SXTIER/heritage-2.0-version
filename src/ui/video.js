export function initAboutVideo() {
  const aboutSection = document.getElementById('about');
  const aboutVideo = document.querySelector('.about-video');
  if (!aboutSection || !aboutVideo) return;

  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutVideo.play().catch(() => {});
      } else {
        aboutVideo.pause();
      }
    });
  }, { threshold: 0.25 });

  videoObserver.observe(aboutSection);
}
