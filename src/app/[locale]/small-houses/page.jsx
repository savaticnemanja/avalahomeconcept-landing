'use client';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import { Lightbox } from '@/components';
import smallHousesMain from '@/assets/projects/small-houses/main.webp';
import smallHousesInfo1 from '@/assets/projects/small-houses/info-1.webp';
import smallHousesInfo2 from '@/assets/projects/small-houses/info-2.webp';
import smallHousesGallery1 from '@/assets/projects/small-houses/view-1.webp';
import smallHousesGallery2 from '@/assets/projects/small-houses/view-2.webp';
import smallHousesGallery3 from '@/assets/projects/small-houses/view-3.webp';
import smallHousesGallery4 from '@/assets/projects/small-houses/view-4.webp';
import smallHousesGallery5 from '@/assets/projects/small-houses/view-5.webp';
import smallHousesGallery6 from '@/assets/projects/small-houses/view-6.webp';
import smallHousesVideo from '@/assets/projects/small-houses/video.mp4';
import { useI18n } from '@/i18n/I18nProvider';

const lightboxSources = [
  smallHousesMain,
  smallHousesInfo1,
  smallHousesInfo2,
  smallHousesGallery1,
  smallHousesGallery2,
  smallHousesGallery3,
  smallHousesGallery4,
  smallHousesGallery5,
  smallHousesGallery6,
];

export default function SmallHousesPage() {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(null);
  const close = useCallback(() => setActiveIndex(null), []);

  const lightboxImages = lightboxSources.map((src, i) => ({
    src,
    alt: `${t('smallHouses.title')} ${i + 1}`,
  }));

  return (
    <main className="pt-20">
      {/* Hero */}
      <div
        className="relative h-[60vh] min-h-[400px] overflow-hidden cursor-pointer"
        onClick={() => setActiveIndex(0)}
      >
        <Image
          src={smallHousesMain}
          alt={lightboxImages[0].alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-bg-dark/30" />
        <div className="absolute inset-0 flex items-end pb-12">
          <div className="safe-zone">
            <h1
              className="text-text-light leading-tight"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 400 }}
            >
              {t('smallHouses.title')}
            </h1>
            <span className="overline">{t('smallHouses.eyebrow')}</span>
          </div>
        </div>
      </div>

      {/* Info images */}
      <section className="py-8 md:py-16 bg-bg">
        <div className="safe-zone">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[lightboxImages[1], lightboxImages[2]].map((img, i) => (
              <div
                key={i}
                className="cursor-pointer rounded-[4px] overflow-hidden border border-border hover:shadow-md transition-shadow duration-200"
                onClick={() => setActiveIndex(i + 1)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={450}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Video */}
          <video
            controls
            poster={smallHousesMain.src}
            preload="none"
            className="w-full rounded-[4px] border border-border mb-12"
          >
            <source src={smallHousesVideo} type="video/mp4" />
          </video>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {lightboxImages.slice(3).map(({ src, alt }, i) => (
              <div
                key={i}
                className="cursor-pointer rounded-[4px] overflow-hidden border border-border hover:-translate-y-[2px] hover:shadow-md transition-all duration-200"
                onClick={() => setActiveIndex(i + 3)}
              >
                <Image
                  src={src}
                  alt={alt}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        images={lightboxImages}
        activeIndex={activeIndex}
        onClose={close}
        onSetIndex={setActiveIndex}
      />
    </main>
  );
}
