'use client';
import { useEffect, useState } from 'react';
import { LuArrowUp } from 'react-icons/lu';

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => {
        if (window.__lenis) window.__lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      aria-label="Nazad na vrh"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 40,
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-accent)',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(196,151,90,0.4)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.25s ease, transform 0.25s ease, background-color 0.15s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)'; }}
      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-accent)'; }}
    >
      <LuArrowUp style={{ width: '16px', height: '16px' }} />
    </button>
  );
};
