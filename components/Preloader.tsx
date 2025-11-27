'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleLoad = () => {
      if (typeof (window as any).anime !== 'undefined') {
        const preloader = document.querySelector('.preloader');
        const preloaderContent = document.querySelector('.preloader-content');
        
        if (preloader && preloaderContent) {
          const tl = (window as any).anime.timeline({
            easing: 'easeOutExpo',
            delay: 500,
          });

          tl.add({
            targets: preloaderContent,
            opacity: 0,
            scale: 0.8,
            duration: 800,
          })
          .add({
            targets: preloader,
            opacity: 0,
            duration: 800,
            complete: () => {
              setIsHidden(true);
            },
          }, '-=400');
        }
      } else {
        setTimeout(() => setIsHidden(true), 800);
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (isHidden) return null;

  return (
    <div className="preloader">
      <div className="preloader-content">
        <span className="preloader-sakura">🌸</span>
        <span className="preloader-text">Loading...</span>
      </div>
    </div>
  );
}

