'use client';
import { useEffect, useRef, useState } from 'react';
import { LuBadgeCheck } from 'react-icons/lu';
import { specificationIcons } from '@/lib/specifications';
import { useI18n } from '@/i18n/I18nProvider';

export const Specifications = () => {
  const { t, dict } = useI18n();
  const specs = specificationIcons.map((icon, i) => ({
    icon,
    title: dict.specifications.items[i].title,
    description: dict.specifications.items[i].description,
  }));

  const gridRef = useRef(null);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActiveCount(specs.length);
      return;
    }

    let raf = null;
    const update = () => {
      raf = null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((vh * 0.6 - rect.top) / rect.height, 0), 1);
      setActiveCount(Math.round(progress * specs.length));
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [specs.length]);

  return (
    <section className="py-12 md:py-24 bg-bg-dark">
      <div className="safe-zone">
        <div className="section-header-centered">
          <span className="overline"><LuBadgeCheck />{t('specifications.eyebrow')}</span>
          <h2
            className="text-text-light leading-tight"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400 }}
          >
            {t('specifications.title')}
          </h2>
        </div>
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border-dark">
          {specs.map((item, i) => {
            const Icon = item.icon;
            const active = i < activeCount;
            return (
              <div
                key={i}
                className={`flex flex-col gap-3 md:gap-4 p-4 md:p-7 group transition-colors duration-300 hover:bg-bg-mid ${active ? 'bg-bg-mid' : 'bg-bg-dark'}`}
              >
                <span className={`w-10 h-10 flex items-center justify-center border rounded-full transition-all duration-300 group-hover:border-accent/50 group-hover:text-accent-strong ${active ? 'border-accent/50 text-accent-strong' : 'border-border-dark text-text-light/30'}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <h3
                  className="text-text-light"
                  style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 400 }}
                >
                  {item.title}
                </h3>
                <p className="text-text-light/40 text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
