'use client';

import { useEffect, useRef } from 'react';

export default function TypingAnimation() {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const words = ['Creative Developer', 'UI/UX Designer', 'Frontend Engineer', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentWord = '';

    function type() {
      const word = words[wordIndex];
      
      if (isDeleting) {
        currentWord = word.substring(0, charIndex - 1);
        charIndex--;
      } else {
        currentWord = word.substring(0, charIndex + 1);
        charIndex++;
      }
      
      if (textRef.current) {
        textRef.current.textContent = currentWord;
      }
      
      let typeSpeed = isDeleting ? 50 : 100;
      
      if (!isDeleting && charIndex === word.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }
      
      setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1500);
  }, []);

  return <span ref={textRef} className="typing-text"></span>;
}

