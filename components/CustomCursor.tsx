'use client';

import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;

    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursor || !cursorDot || !cursorOutline) return;

    let mouseX = 0,
      mouseY = 0;
    let outlineX = 0,
      outlineY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      (cursorDot as HTMLElement).style.left = mouseX + 'px';
      (cursorDot as HTMLElement).style.top = mouseY + 'px';
    };

    const animateOutline = () => {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      (cursorOutline as HTMLElement).style.left = outlineX + 'px';
      (cursorOutline as HTMLElement).style.top = outlineY + 'px';
      requestAnimationFrame(animateOutline);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animateOutline();

    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, .skill-tag, .project-card'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    const handleMouseLeave = () => {
      (cursor as HTMLElement).style.opacity = '0';
    };
    const handleMouseEnter = () => {
      (cursor as HTMLElement).style.opacity = '1';
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div className="cursor">
      <div className="cursor-dot"></div>
      <div className="cursor-outline"></div>
    </div>
  );
}

