'use client';

export function initLogoAnimation() {
  if (typeof window === 'undefined' || typeof (window as any).anime === 'undefined') return;

  const logoKanji = document.querySelector('.logo-kanji');
  const logoText = document.querySelector('.logo-text');
  const logoDot = document.querySelector('.logo-dot');

  if (logoKanji) {
    (window as any).anime({
      targets: logoKanji,
      scale: [1, 1.1, 1],
      filter: [
        'drop-shadow(0 0 12px rgba(244, 165, 184, 0.4))',
        'drop-shadow(0 0 25px rgba(244, 165, 184, 0.6)) drop-shadow(0 0 50px rgba(244, 165, 184, 0.3))',
        'drop-shadow(0 0 12px rgba(244, 165, 184, 0.4))',
      ],
      duration: 4000,
      easing: 'easeInOutSine',
      loop: true,
    });

    (window as any).anime({
      targets: logoKanji,
      rotate: [-3, 3, -3],
      duration: 6000,
      easing: 'easeInOutSine',
      loop: true,
    });
  }

  if (logoText) {
    (window as any).anime({
      targets: logoText,
      backgroundPosition: ['200% 0', '0% 0', '200% 0'],
      duration: 8000,
      easing: 'easeInOutQuad',
      loop: true,
    });
  }

  if (logoDot) {
    (window as any).anime({
      targets: logoDot,
      scale: [1, 1.4, 1],
      opacity: [0.6, 1, 0.6],
      boxShadow: [
        '0 0 10px rgba(244, 165, 184, 0.4)',
        '0 0 20px rgba(244, 165, 184, 0.8)',
        '0 0 10px rgba(244, 165, 184, 0.4)',
      ],
      duration: 2500,
      easing: 'easeInOutSine',
      loop: true,
    });
  }
}

export function initBentoHoverAnimations() {
  if (typeof window === 'undefined' || typeof (window as any).anime === 'undefined') return;

  const bentoItems = document.querySelectorAll('.bento-item');
  bentoItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      (window as any).anime.remove(item);
      (window as any).anime({
        targets: item,
        scale: 1.015,
        translateY: -5,
        easing: 'easeOutElastic(1, .6)',
        duration: 800,
      });
    });

    item.addEventListener('mouseleave', () => {
      (window as any).anime.remove(item);
      (window as any).anime({
        targets: item,
        scale: 1,
        translateY: 0,
        easing: 'easeOutQuad',
        duration: 600,
      });
    });
  });
}

export function initMagneticButtons() {
  if (typeof window === 'undefined' || typeof (window as any).anime === 'undefined') return;
  if (window.matchMedia('(hover: none)').matches) return;

  const magneticElements = document.querySelectorAll('.magnetic');

  magneticElements.forEach((el) => {
    el.addEventListener('mousemove', (e: any) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const strength = 0.3;
      (window as any).anime.set(el, {
        translateX: x * strength,
        translateY: y * strength,
      });
    });

    el.addEventListener('mouseleave', () => {
      (window as any).anime({
        targets: el,
        translateX: 0,
        translateY: 0,
        duration: 800,
        easing: 'easeOutElastic(1, .5)',
      });
    });
  });
}

