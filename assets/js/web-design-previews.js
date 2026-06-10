document.addEventListener('DOMContentLoaded', () => {
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

  const extraPreviewMap = {
    'https://ryangivans.github.io/block-street-records/': '/VVC-2/assets/media/web-design/videos/blockstreet-1.mp4',
    'https://ryangivans.github.io/fay-town-hottie/index.html': '/VVC-2/assets/media/web-design/videos/hotsauce-1.mp4',
    'https://ryangivans.github.io/ink-therapy/index.html': '/VVC-2/assets/media/web-design/videos/inktherapy-1.mp4',
    'https://ryangivans.github.io/petalsandpanes/': '/VVC-2/assets/media/web-design/videos/petals-1.mp4'
  };

  document.querySelectorAll('.more-sites-grid a').forEach((link) => {
    const videoSrc = extraPreviewMap[link.href];
    if (!videoSrc) return;

    link.classList.add('more-site-preview-card');
    link.setAttribute('data-site-preview', '');

    const previewWrap = document.createElement('span');
    previewWrap.className = 'more-site-preview-media';

    const video = document.createElement('video');
    video.className = 'site-preview-video';
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'none';
    video.innerHTML = `<source src="${videoSrc}" type="video/mp4">`;

    const hint = document.createElement('span');
    hint.className = 'preview-hint';
    hint.textContent = coarsePointer ? 'Tap to preview' : 'Hover to preview';

    previewWrap.append(video, hint);
    link.prepend(previewWrap);
  });

  const previewCards = document.querySelectorAll('[data-site-preview]');

  previewCards.forEach((card) => {
    const video = card.querySelector('.site-preview-video');
    if (!video) return;

    const hint = card.querySelector('.preview-hint');
    if (hint) hint.textContent = coarsePointer ? 'Tap to preview' : 'Hover to preview';

    const playPreview = () => {
      card.classList.add('is-previewing');
      video.play().catch(() => {});
    };

    const stopPreview = () => {
      card.classList.remove('is-previewing');
      video.pause();
      try {
        video.currentTime = 0;
      } catch (_) {}
    };

    if (!coarsePointer) {
      card.addEventListener('mouseenter', playPreview);
      card.addEventListener('mouseleave', stopPreview);
      card.addEventListener('focusin', playPreview);
      card.addEventListener('focusout', stopPreview);
      return;
    }

    card.addEventListener('click', (event) => {
      if (!card.classList.contains('is-previewing')) {
        event.preventDefault();
        previewCards.forEach((otherCard) => {
          if (otherCard === card) return;
          const otherVideo = otherCard.querySelector('.site-preview-video');
          otherCard.classList.remove('is-previewing');
          if (otherVideo) {
            otherVideo.pause();
            try {
              otherVideo.currentTime = 0;
            } catch (_) {}
          }
        });
        playPreview();
      }
    });
  });
});
