'use client';
import Link from 'next/link';
import Image from 'next/image';
import { LuImages, LuArrowRight } from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';
import promo from '@/assets/promo/revolucija-stanovanja.webp';

// `images` — up to 9 src strings from the first gallery album (server-resolved,
// posters used for videos). Renders nothing when the album has no media.
export const GalleryPreview = ({ images = [] }) => {
  const { t, href } = useI18n();
  const gridImages = images.slice(0, 9);
  if (gridImages.length === 0) return null;

  return (
    <section className="py-12 md:py-24 bg-bg overflow-hidden">
      <div className="safe-zone">
        <div className="section-header mb-8 md:mb-12" data-reveal>
          <span className="overline"><LuImages />{t('galleryPreview.eyebrow')}</span>
          <h2
            className="text-text"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400 }}
          >
            {t('galleryPreview.title')}
          </h2>
          <p className="text-text-muted text-sm md:text-base font-light max-w-xl mt-3">
            {t('galleryPreview.text')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-3 items-stretch" data-reveal>
          <div className="relative overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-full">
            <Image
              src={promo}
              alt={t('galleryPreview.title')}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {gridImages.map((src, i) => (
              <Link
                key={i}
                href={href('/gallery')}
                className="group relative overflow-hidden block"
                style={{ aspectRatio: '1/1' }}
              >
                <Image
                  src={src}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-bg-dark/0 group-hover:bg-bg-dark/25 transition-colors duration-300" />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 md:mt-12" data-reveal>
          <Link href={href('/contact')} className="btn-primary inline-flex group">
            {t('galleryPreview.cta')}
            <span className="btn-arrow flex items-center"><LuArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>
      </div>
    </section>
  );
};
