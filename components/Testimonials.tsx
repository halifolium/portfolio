'use client';

import { useEffect, useState, useCallback } from 'react';

const testimonials = [
  {
    text: 'Exceptional work! The attention to detail and creativity exceeded our expectations. Highly recommended.',
    avatar: '👨‍💼',
    name: 'Alex Johnson',
    role: 'CEO, TechStart',
  },
  {
    text: 'A true professional who delivers on time and with outstanding quality. The design was exactly what we needed.',
    avatar: '👩‍💻',
    name: 'Sarah Chen',
    role: 'Product Manager, InnovateCo',
  },
  {
    text: 'Incredible talent and great communication throughout the project. Would definitely work together again!',
    avatar: '👨‍🎨',
    name: 'Mike Rivera',
    role: 'Creative Director, DesignHub',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof (window as any).anime === 'undefined') return;

    const section = document.getElementById('testimonials');
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

  const showCard = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);

    const cards = document.querySelectorAll('.testimonial-card');
    const currentCard = cards[currentIndex];
    const nextCard = cards[index];

    if (currentCard && nextCard) {
      (window as any).anime({
        targets: currentCard,
        opacity: [1, 0],
        translateX: [0, -20],
        duration: 400,
        easing: 'easeInQuad',
        complete: () => {
          (currentCard as HTMLElement).classList.remove('active');
          (nextCard as HTMLElement).classList.add('active');
          (nextCard as HTMLElement).style.opacity = '0';

          (window as any).anime({
            targets: nextCard,
            opacity: [0, 1],
            translateX: [20, 0],
            duration: 600,
            easing: 'easeOutQuad',
            complete: () => {
              setIsAnimating(false);
              setCurrentIndex(index);
            },
          });
        },
      });
    }
  }, [isAnimating, currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isAnimating) {
      showCard(currentIndex);
    }
  }, [currentIndex, isAnimating, showCard]);

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <h2>What People Say</h2>
        <div className="testimonials-carousel">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card ${index === currentIndex ? 'active' : ''}`}
            >
              <div className="testimonial-content">
                <p>&quot;{testimonial.text}&quot;</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <span>{testimonial.avatar}</span>
                </div>
                <div className="author-info">
                  <span className="author-name">{testimonial.name}</span>
                  <span className="author-role">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="testimonials-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => showCard(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}

