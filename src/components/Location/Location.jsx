'use client';
import { LuMapPin } from 'react-icons/lu';
import { LocationMap } from './LocationMap';
import { useI18n } from '@/i18n/I18nProvider';

export const Location = () => {
  const { t } = useI18n();

  return (
    <section className="py-12 md:py-24 bg-bg-alt">
      <div className="safe-zone">

        <div className="section-header" data-reveal>
          <span className="overline"><LuMapPin />{t('location.eyebrow')}</span>
          <h2
            className="text-text"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400 }}
          >
            {t('location.title')}
          </h2>
          <p className="text-text-muted font-light mt-4 max-w-lg text-sm leading-relaxed">
            {t('location.text')}
          </p>
        </div>

        <LocationMap />
      </div>
    </section>
  );
};
