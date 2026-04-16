'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [overlayHero, setOverlayHero] = useState(isHome);

  const updateFromHero = useCallback(() => {
    if (!isHome) {
      setOverlayHero(false);
      return;
    }
    const hero = document.getElementById('site-hero');
    if (!hero) {
      setOverlayHero(true);
      return;
    }
    const rect = hero.getBoundingClientRect();
    // Mientras el hero siga visible bajo el header (~56px), navbar en modo oscuro
    setOverlayHero(rect.bottom > 56);
  }, [isHome]);

  useEffect(() => {
    if (!isHome) {
      setOverlayHero(false);
      return;
    }
    setOverlayHero(true);
    updateFromHero();
    window.addEventListener('scroll', updateFromHero, { passive: true });
    window.addEventListener('resize', updateFromHero);
    return () => {
      window.removeEventListener('scroll', updateFromHero);
      window.removeEventListener('resize', updateFromHero);
    };
  }, [isHome, updateFromHero]);

  return <Navbar overlayHero={overlayHero} />;
}
