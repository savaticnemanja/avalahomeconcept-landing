'use client';
import { useEffect, useRef, useState } from 'react';
import { LuKeyRound, LuFilePen, LuHouse, LuWallet } from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';

// Language-neutral data (number, amount, icon); label/detail from dict.payment.steps
const stepData = [
  { number: '01', amount: '5.000€', icon: LuKeyRound },
  { number: '02', amount: '30%', icon: LuFilePen },
  { number: '03', amount: '70%', icon: LuHouse },
];

export const PaymentDynamic = () => {
  const { t } = useI18n();
  const stepsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const steps = stepData.map((s, i) => ({
    ...s,
    label: t(`payment.steps.${i}.label`),
    detail: t(`payment.steps.${i}.detail`),
  }));

  // Scroll-driven emphasis: as the steps grid travels through the viewport,
  // sequentially highlight step 1, then 2, then 3 (mirrors the hover state).
  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;
    let raf = null;
    const update = () => {
      raf = null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Fully out of view → no emphasis
      if (rect.bottom <= 0 || rect.top >= vh) {
        setActiveIndex(-1);
        return;
      }
      // Progress of the grid's center across the viewport (0 = entering bottom, 1 = leaving top)
      const center = rect.top + rect.height / 2;
      const progress = Math.min(Math.max((vh - center) / vh, 0), 1);
      // Scroll thresholds per step; 3rd step is emphasized a little earlier (0.56 vs even 0.67)
      const thresholds = [0, 0.34, 0.48];
      let idx = 0;
      for (let i = 0; i < thresholds.length; i++) {
        if (progress >= thresholds[i]) idx = i;
      }
      setActiveIndex(idx);
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
  }, [steps.length]);

  return (
  <section className="py-8 md:py-16 bg-bg">
    <div className="safe-zone">

      {/* Header */}
      <div className="section-header" data-reveal>
        <span className="overline"><LuWallet />{t('payment.eyebrow')}</span>
        <h2
          className="text-text"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400 }}
        >
          {t('payment.title')}
        </h2>
      </div>

      {/* Steps */}
      <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border" data-reveal>
        {steps.map(({ number, amount, label, detail, icon: Icon }, i) => {
          const active = i === activeIndex;
          return (
          <div
            key={i}
            className={`p-4 md:p-8 xl:p-12 flex flex-col gap-5 md:gap-6 group transition-colors duration-300 hover:bg-bg-alt ${active ? 'bg-bg-alt' : 'bg-bg'}`}
          >
            {/* Number + icon row */}
            <div className="flex items-center justify-between">
              <span
                className="text-border"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', fontWeight: 400, lineHeight: 1 }}
                aria-hidden="true"
              >
                {number}
              </span>
              <span className={`w-12 h-12 flex items-center justify-center border rounded-full transition-all duration-300 group-hover:border-accent group-hover:text-accent-strong ${active ? 'border-accent text-accent-strong' : 'border-border text-text-muted'}`}>
                <Icon className="w-5 h-5" />
              </span>
            </div>

            {/* Amount */}
            <div>
              <p
                className="text-accent-strong"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: 400, lineHeight: 1 }}
              >
                {amount}
              </p>
              <p
                className="text-text mt-1"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 400 }}
              >
                {label}
              </p>
            </div>

            {/* Detail */}
            <p className="text-text-muted text-sm font-light leading-relaxed border-t border-border pt-5">
              {detail}
            </p>
          </div>
          );
        })}
      </div>

    </div>
  </section>
  );
};
