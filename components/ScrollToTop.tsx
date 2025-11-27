'use client';

import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (window.scrollY > 500) {
        if (!isVisible) {
          setIsVisible(true);
          if (typeof (window as any).anime !== 'undefined') {
            const btn = document.querySelector('.scroll-top');
            if (btn) {
              (window as any).anime({
                targets: btn,
                scale: [0, 1],
                opacity: [0, 1],
                duration: 400,
                easing: 'easeOutBack',
              });
            }
          }
        }
      } else {
        if (isVisible) {
          setIsVisible(false);
          if (typeof (window as any).anime !== 'undefined') {
            const btn = document.querySelector('.scroll-top');
            if (btn) {
              (window as any).anime({
                targets: btn,
                scale: [1, 0],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInBack',
              });
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    if (typeof (window as any).anime !== 'undefined') {
      const scrollElement = document.scrollingElement || document.documentElement;
      (window as any).anime({
        targets: scrollElement,
        scrollTop: 0,
        duration: 1000,
        easing: 'easeInOutQuart',
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <button className="scroll-top" aria-label="Scroll to top" onClick={scrollToTop}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}

