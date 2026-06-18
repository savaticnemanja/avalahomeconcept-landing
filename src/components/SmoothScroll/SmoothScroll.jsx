'use client';
import { useEffect } from 'react';

export const SmoothScroll = () => {
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const wideScreen = window.matchMedia('(min-width: 1024px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || !wideScreen || reducedMotion) return;

    let lenis;
    let rafId;
    let cancelled = false;
    const prevScrollBehavior = document.documentElement.style.scrollBehavior;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
      });
      window.__lenis = lenis;

      document.documentElement.style.scrollBehavior = 'auto';

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      window.__lenis = null;
      document.documentElement.style.scrollBehavior = prevScrollBehavior;
    };
  }, []);

  return null;
};
