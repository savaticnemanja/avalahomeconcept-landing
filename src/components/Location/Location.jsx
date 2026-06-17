'use client';
import { LocationMap } from './LocationMap';
import { useI18n } from '@/i18n/I18nProvider';

export const Location = () => {
  const { t } = useI18n();

  return (
    <section className="py-12 md:py-24 bg-bg-alt">
      <div className="safe-zone">

        {/* Header */}
        <div className="section-header" data-reveal>
          <h2
            className="text-text"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400 }}
          >
            {t('location.title')}
          </h2>
          <span className="overline">{t('location.eyebrow')}</span>
          <p className="text-text-muted font-light mt-4 max-w-lg text-sm leading-relaxed">
            {t('location.text')}
          </p>
        </div>

        <LocationMap />
      </div>
    </section>
  );
};
