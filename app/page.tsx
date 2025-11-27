'use client';

import { useEffect } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Testimonials from '@/components/Testimonials';
import Experience from '@/components/Experience';
import { initBentoHoverAnimations, initMagneticButtons } from '@/lib/anime-init';

export default function Home() {
  useEffect(() => {
    // Initialize animations after anime.js loads
    const checkAnime = setInterval(() => {
      if (typeof (window as any).anime !== 'undefined') {
        initBentoHoverAnimations();
        initMagneticButtons();
        clearInterval(checkAnime);
      }
    }, 100);

    return () => clearInterval(checkAnime);
  }, []);

  return (
    <>
      <Hero />
      <div className="container">
        <div className="bento-grid">
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </div>
      <Testimonials />
      <Experience />
    </>
  );
}

