// script.js
// Sand particle generator for the hero section
(function () {
  const sandContainer = document.querySelector('.sand-moving');
  if (!sandContainer) return;

  const PARTICLES = 160; // change to taste (keeps performance in mind)
  for (let i = 0; i < PARTICLES; i++) {
    const sand = document.createElement('span');
    sand.style.setProperty('--x', Math.random());
    sand.style.setProperty('--y', Math.random());
    sand.style.setProperty('--speed', Math.random());
    sand.style.setProperty('--delay', Math.random());
    sandContainer.appendChild(sand);
  }

  // Optional: pause animation when not visible to save CPU (using IntersectionObserver)
  try {
    const video = document.getElementById('bg-video');
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          // pause video when hero not visible
          if (video && !video.paused) video.pause();
          // reduce canvas activity by setting animation-play-state
          sandContainer.style.animationPlayState = 'paused';
          sandContainer.querySelectorAll('span').forEach(s => s.style.animationPlayState = 'paused');
        } else {
          if (video && video.paused) video.play();
          sandContainer.style.animationPlayState = 'running';
          sandContainer.querySelectorAll('span').forEach(s => s.style.animationPlayState = 'running');
        }
      });
    }, { threshold: 0.25 });

    io.observe(document.querySelector('#hero'));
  } catch (e) {
    // ignore if IntersectionObserver not supported
    console.warn('IntersectionObserver error', e);
  }
})();
