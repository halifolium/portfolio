'use client';

import { useEffect } from 'react';

const projects = [
  { emoji: '🎨', title: 'Design System', desc: 'UI component library', tags: ['React', 'Storybook'] },
  { emoji: '🚀', title: 'Dashboard App', desc: 'Analytics platform', tags: ['Vue', 'D3.js'] },
  { emoji: '🌐', title: 'E-commerce', desc: 'Online store', tags: ['Next.js', 'Stripe'] },
];

export default function Projects() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof (window as any).anime === 'undefined') return;

    const section = document.getElementById('projects');
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

    // Hover animations for project items
    const projectItems = document.querySelectorAll('#projects ul li');
    projectItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        (window as any).anime.remove(item);
        (window as any).anime({
          targets: item,
          translateX: 8,
          scale: 1.01,
          duration: 800,
          easing: 'easeOutElastic(1, .6)',
        });
      });

      item.addEventListener('mouseleave', () => {
        (window as any).anime.remove(item);
        (window as any).anime({
          targets: item,
          translateX: 0,
          scale: 1,
          duration: 600,
          easing: 'easeOutQuad',
        });
      });
    });
  }, []);

  return (
    <section id="projects" className="bento-item bento-projects">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <a key={index} href="#" className="project-card">
            <div className="project-preview">
              <span className="project-emoji">{project.emoji}</span>
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

