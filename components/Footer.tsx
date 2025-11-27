'use client';

import { useEffect } from 'react';

export default function Footer() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (typeof (window as any).anime === 'undefined') return;

    const heart = document.getElementById('footer-heart');
    const container = document.getElementById('footer-heart-container');

    if (!heart || !container) return;

    const heartEmojis = ['❤️', '💖', '💗', '💓', '💕', '💘', '🩷', '💝', '💞', '🌸'];

    const createFountain = () => {
      (window as any).anime({
        targets: heart,
        scale: [1, 1.4, 1],
        rotate: [0, -10, 10, 0],
        duration: 400,
        easing: 'easeOutElastic(1, .5)',
      });

      const heartCount = 12 + Math.floor(Math.random() * 4);

      for (let i = 0; i < heartCount; i++) {
        const flyingHeart = document.createElement('span');
        flyingHeart.className = 'flying-heart';
        flyingHeart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        flyingHeart.style.fontSize = (0.8 + Math.random() * 0.8) + 'em';
        flyingHeart.style.transform = 'translate(-50%, -50%) scale(0)';
        flyingHeart.style.opacity = '0';
        container.appendChild(flyingHeart);

        const angle = -90 + (Math.random() - 0.5) * 100;
        const velocity = 60 + Math.random() * 80;
        const radians = (angle * Math.PI) / 180;
        const peakX = Math.cos(radians) * velocity;
        const peakY = Math.sin(radians) * velocity;
        const endX = peakX * 1.3;
        const endY = peakY + 50 + Math.random() * 30;
        const duration = 1000 + Math.random() * 500;
        const delay = i * 25;
        const peakScale = 1 + Math.random() * 0.5;
        const rotation = (Math.random() - 0.5) * 360;

        setTimeout(() => {
          (window as any).anime({
            targets: flyingHeart,
            translateX: [0, peakX],
            translateY: [0, peakY],
            scale: [0.3, peakScale],
            rotate: [0, rotation * 0.5],
            opacity: [1, 1],
            duration: duration * 0.5,
            easing: 'easeOutQuad',
            complete: () => {
              (window as any).anime({
                targets: flyingHeart,
                translateX: [peakX, endX],
                translateY: [peakY, endY],
                scale: [peakScale, 0.2],
                rotate: [rotation * 0.5, rotation],
                opacity: [1, 0],
                duration: duration * 0.5,
                easing: 'easeInQuad',
                complete: () => flyingHeart.remove(),
              });
            },
          });
        }, delay);
      }
    };

    heart.addEventListener('click', createFountain);
    heart.tabIndex = 0;
    heart.setAttribute('role', 'button');
    heart.setAttribute('aria-label', 'Celebrate with hearts');
    heart.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        createFountain();
        e.preventDefault();
      }
    });
  }, []);

  return (
    <footer>
      <div className="container">
        <p>
          &copy; Made by Halifolium with{' '}
          <span id="footer-heart-container">
            <span id="footer-heart">❤️</span>
          </span>{' '}
          in 2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

