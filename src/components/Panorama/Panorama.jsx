'use client';
import Image from 'next/image';
import { LuMountain } from 'react-icons/lu';
import complexDusk from '@/assets/panorama/complex-dusk.webp';
import { useI18n } from '@/i18n/I18nProvider';

export const Panorama = () => {
  const { t } = useI18n();

  return (
    <section className="py-16 md:py-24 bg-bg-dark">
      <div className="safe-zone">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14" data-reveal>
          <span className="overline"><LuMountain />{t('panorama.eyebrow')}</span>
          <h2
            className="text-text-light"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 400, lineHeight: 1.1 }}
          >
            {t('panorama.titleA')}{' '}
            <em>{t('panorama.titleEm')}</em>
          </h2>
        </div>

        <figure className="relative max-w-6xl mx-auto overflow-hidden border border-white/15" data-reveal>
          <Image
            src={complexDusk}
            alt={t('panorama.alt')}
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="w-full h-auto"
            placeholder="blur"
          />
          <figcaption
            className="absolute inset-x-0 bottom-0 px-5 py-4 md:px-8 md:py-6 text-text-light/90 text-sm md:text-base font-light"
            style={{ background: 'linear-gradient(0deg, rgba(20,28,22,0.85) 0%, rgba(20,28,22,0) 100%)' }}
          >
            {t('panorama.caption')}
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
