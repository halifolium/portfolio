'use client';

import { useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { initLogoAnimation } from '@/lib/anime-init';

export default function Header() {
  useEffect(() => {
    // Header scroll effect
    const header = document.querySelector('header');
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initialize logo animation after anime.js loads
    const checkAnime = setInterval(() => {
      if (typeof (window as any).anime !== 'undefined') {
        initLogoAnimation();
        clearInterval(checkAnime);
      }
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(checkAnime);
    };
  }, []);

  return (
    <header>
      <div className="container">
        <a href="#" className="logo">
          <span className="logo-kanji">🌸</span>
          <span className="logo-text">Halifolium Studio</span>
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}

