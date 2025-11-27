'use client';

import { useEffect } from 'react';

const experiences = [
  {
    date: '2025 - Present',
    title: 'Founder & Lead Developer',
    company: 'Halifolium Studio',
    description:
      'Founded my own creative studio specializing in crafting beautiful, high-performance websites and digital experiences. Providing end-to-end solutions from design to deployment.',
  },
  {
    date: '2021 (6 months)',
    title: 'Junior Developer Intern',
    company: 'Google Inc',
    description:
      'Contributed to the development of internal proprietary tools and products. Worked with cross-functional teams on closed-source projects under NDA, gaining valuable experience in enterprise-scale development.',
  },
];

export default function Experience() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof (window as any).anime === 'undefined') return;

    const section = document.getElementById('experience');
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

    // Timeline hover animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => {
      const marker = item.querySelector('.timeline-marker');
      const content = item.querySelector('.timeline-content');

      if (!marker || !content) return;

      item.addEventListener('mouseenter', () => {
        (window as any).anime.remove(marker);
        (window as any).anime({
          targets: marker,
          scale: 1.3,
          backgroundColor: '#ff7eb6',
          boxShadow: '0 0 20px rgba(255, 126, 182, 0.6)',
          easing: 'easeOutElastic(1, .5)',
          duration: 800,
        });

        (window as any).anime.remove(content);
        (window as any).anime({
          targets: content,
          translateX: 10,
          borderColor: '#ff7eb6',
          easing: 'easeOutElastic(1, .8)',
          duration: 800,
        });
      });

      item.addEventListener('mouseleave', () => {
        (window as any).anime.remove(marker);
        (window as any).anime({
          targets: marker,
          scale: 1,
          backgroundColor: '#1a1a2e',
          boxShadow: 'none',
          easing: 'easeOutQuad',
          duration: 500,
          complete: () => {
            (marker as HTMLElement).style.boxShadow = '';
            (marker as HTMLElement).style.backgroundColor = '';
          },
        });

        (window as any).anime.remove(content);
        (window as any).anime({
          targets: content,
          translateX: 0,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          easing: 'easeOutQuad',
          duration: 500,
          complete: () => {
            (content as HTMLElement).style.borderColor = '';
          },
        });
      });
    });
  }, []);

  return (
    <section id="experience" className="timeline-section">
      <div className="container">
        <h2>Experience</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="timeline-date">{exp.date}</span>
                <h3>{exp.title}</h3>
                <p className="timeline-company">{exp.company}</p>
                <p>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

