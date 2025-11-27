'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') || 'dark') as 'dark' | 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Anime.js animation
    if (typeof window !== 'undefined' && (window as any).anime) {
      const toggle = document.querySelector('.theme-toggle');
      if (toggle) {
        (window as any).anime({
          targets: toggle,
          scale: [1, 0.8, 1.1, 1],
          duration: 400,
          easing: 'easeInOutQuad',
        });
      }
    }
  };

  return (
    <button className="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme}>
      <span className="theme-icon-dark">🌙</span>
      <span className="theme-icon-light">☀️</span>
    </button>
  );
}

