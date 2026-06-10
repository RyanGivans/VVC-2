document.addEventListener('DOMContentLoaded', () => {
  const previewCards = document.querySelectorAll('[data-site-preview]');
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

  previewCards.forEach((card) => {
    const video = card.querySelector('.site-preview-video');
    if (!video) return;

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
