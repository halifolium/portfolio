'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import TypingAnimation from './TypingAnimation';

export default function Hero() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof (window as any).anime === 'undefined') return;

    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    (window as any).anime.timeline({ easing: 'easeOutExpo' })
      .add({
        targets: '.hero-greeting',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
      })
      .add({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1200,
      }, '-=600')
      .add({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
      }, '-=800')
      .add({
        targets: '.hero-cta .btn',
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.9, 1],
        delay: (window as any).anime.stagger(150),
        duration: 800,
      }, '-=600');

    // Hero image hover animation
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-bg img');
    
    if (heroSection && heroImage) {
      heroSection.addEventListener('mouseenter', () => {
        (window as any).anime.remove(heroImage);
        (window as any).anime({
          targets: heroImage,
          scale: 1.05,
          duration: 2000,
          easing: 'easeOutQuad',
        });
      });
      
      heroSection.addEventListener('mouseleave', () => {
        (window as any).anime.remove(heroImage);
        (window as any).anime({
          targets: heroImage,
          scale: 1,
          duration: 2000,
          easing: 'easeOutQuad',
        });
      });
    }
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg">
        <Image
          src="/img/banner.jpg"
          alt="Hero banner"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <p className="hero-greeting">こんにちは, I&apos;m</p>
        <h1 className="hero-title">Lucas Lightwood</h1>
        <p className="hero-subtitle">
          <TypingAnimation />
          <span className="typing-cursor">|</span>
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary magnetic">View Projects</a>
          <a href="#contact" className="btn btn-secondary magnetic">Get in Touch</a>
        </div>
      </div>
    </section>
  );
}

