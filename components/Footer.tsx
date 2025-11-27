'use client';

import { useEffect, useRef } from 'react';

export default function Footer() {
  const cooldownRef = useRef(false);
  const lastClickTimeRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initHeartFountain = () => {
      // Если anime.js не загружен, просто выходим
      if (typeof (window as any).anime === 'undefined') {
        return;
      }

      const heart = document.getElementById('footer-heart');
      const container = document.getElementById('footer-heart-container');

      if (!heart || !container) return;

      const heartEmojis = ['❤️', '💖', '💗', '💓', '💕', '💘', '🩷', '💝', '💞', '🌸'];
      
      // Cooldown между нажатиями (в миллисекундах)
      const COOLDOWN_MS = 2000; // 2 секунды

      const createFountain = () => {
        // Проверяем кулдаун ПЕРВЫМ делом (синхронная проверка через useRef)
        if (cooldownRef.current) {
          // Визуальная обратная связь - легкое покачивание
          if (typeof (window as any).anime !== 'undefined') {
            (window as any).anime({
              targets: heart,
              translateX: [0, -5, 5, -5, 0],
              duration: 300,
              easing: 'easeOutQuad',
            });
          }
          return;
        }
        
        // Устанавливаем кулдаун СРАЗУ, до начала анимации (синхронно)
        cooldownRef.current = true;
        lastClickTimeRef.current = Date.now();
        
        // Визуальная индикация кулдауна
        heart.style.opacity = '0.6';
        heart.style.cursor = 'not-allowed';
        
        // Снимаем кулдаун через указанное время
        setTimeout(() => {
          cooldownRef.current = false;
          heart.style.opacity = '1';
          heart.style.cursor = 'pointer';
        }, COOLDOWN_MS);
      (window as any).anime({
        targets: heart,
        scale: [1, 1.4, 1],
        rotate: [0, -10, 10, 0],
        duration: 400,
        easing: 'easeOutElastic(1, .5)',
      });

      // Получаем позицию сердечка относительно viewport
      const heartRect = heart.getBoundingClientRect();
      const startX = heartRect.left + heartRect.width / 2;
      const startY = heartRect.top + heartRect.height / 2;

      const heartCount = 12 + Math.floor(Math.random() * 4);

      for (let i = 0; i < heartCount; i++) {
        const flyingHeart = document.createElement('span');
        flyingHeart.className = 'flying-heart';
        flyingHeart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        flyingHeart.style.fontSize = (0.8 + Math.random() * 0.8) + 'em';
        flyingHeart.style.left = startX + 'px';
        flyingHeart.style.top = startY + 'px';
        flyingHeart.style.transform = 'translate(-50%, -50%) scale(0)';
        flyingHeart.style.opacity = '0';
        document.body.appendChild(flyingHeart);

        const angle = -90 + (Math.random() - 0.5) * 120;
        const velocity = 150 + Math.random() * 200;
        const radians = (angle * Math.PI) / 180;
        const peakX = Math.cos(radians) * velocity;
        const peakY = Math.sin(radians) * velocity;
        const endX = peakX * 1.8;
        const endY = peakY + 100 + Math.random() * 150;
        const duration = 1500 + Math.random() * 1000;
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
    };

    // Проверяем, загружен ли anime.js
    if (typeof (window as any).anime !== 'undefined') {
      initHeartFountain();
    } else {
      // Ждем загрузки anime.js
      const checkAnime = setInterval(() => {
        if (typeof (window as any).anime !== 'undefined') {
          clearInterval(checkAnime);
          initHeartFountain();
        }
      }, 100);

      // Останавливаем проверку через 5 секунд
      setTimeout(() => {
        clearInterval(checkAnime);
        // Пытаемся инициализировать еще раз на случай, если anime.js загрузился
        initHeartFountain();
      }, 5000);
    }
  }, []);

  return (
    <footer>
      <div className="footer-decoration-top"></div>
      <div className="container">
        <div className="footer-content">
          <div className="footer-sakura">
            <span>🌸</span>
            <span>🌸</span>
            <span>🌸</span>
          </div>
          <div className="footer-text">
            <span className="footer-copyright">&copy; Made by Halifolium</span>
            <span className="footer-heart-wrapper">
              {' '}with{' '}
              <span id="footer-heart-container">
                <span id="footer-heart">❤️</span>
              </span>
              {' '}in 2025
            </span>
          </div>
          <div className="footer-sakura">
            <span>🌸</span>
            <span>🌸</span>
            <span>🌸</span>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-tagline">
        <span className="footer-rights">All rights reserved.</span> Crafting digital experiences with passion and precision
        </div>
      </div>
    </footer>
  );
}

