'use client';

import { useEffect } from 'react';
import { skillsData } from '@/data/skills';

export default function Skills() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof (window as any).anime === 'undefined') return;

    const section = document.getElementById('skills');
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

    // Hover animations for skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag) => {
      tag.addEventListener('mouseenter', () => {
        (window as any).anime.remove(tag);
        (window as any).anime({
          targets: tag,
          scale: 1.15,
          rotate: (window as any).anime.random(-3, 3),
          duration: 800,
          easing: 'easeOutElastic(1, .6)',
        });
      });

      tag.addEventListener('mouseleave', () => {
        (window as any).anime.remove(tag);
        (window as any).anime({
          targets: tag,
          scale: 1,
          rotate: 0,
          duration: 600,
          easing: 'easeOutQuad',
        });
      });
    });
  }, []);

  return (
    <section id="skills" className="bento-item bento-skills">
      <h2>Skills</h2>
      <div className="skills-grid">
        {skillsData.map((skill, index) => (
          <span key={index} className="skill-tag">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d={skill.icon} />
            </svg>
            {skill.name}
          </span>
        ))}
      </div>
    </section>
  );
}

