'use client';

import { useEffect } from 'react';

export default function About() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof (window as any).anime === 'undefined') return;

    const section = document.getElementById('about');
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (window as any).anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [50, 0],
              scale: [0.95, 1],
              duration: 1000,
              easing: 'easeOutExpo',
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    section.style.opacity = '0';
    observer.observe(section);
  }, []);

  return (
    <section id="about" className="bento-item bento-about">
      <h2>About Me</h2>
      <p>
        Creative developer passionate about building beautiful, functional web experiences. I blend
        design aesthetics with clean code to create memorable digital products.
      </p>
    </section>
  );
}

