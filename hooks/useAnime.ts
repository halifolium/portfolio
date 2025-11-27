'use client';

import { useEffect, useState } from 'react';

export function useAnime() {
  const [anime, setAnime] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).anime) {
      setAnime((window as any).anime);
    }
  }, []);

  return anime;
}

