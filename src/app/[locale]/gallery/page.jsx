'use client';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import { LuMaximize2 } from 'react-icons/lu';
import { Lightbox } from '@/components';
import { gallerySources } from '@/lib/gallery';
import { useI18n } from '@/i18n/I18nProvider';

const workProgressVideos = [
  'https://www.youtube.com/embed/APZNvEz0K1U?si=_huoHPFO_dfWY0o1',
  'https://www.youtube.com/embed/USzbMmEXM48?si=aTB0OQtqQH5T4vOA',
  'https://www.youtube.com/embed/wSy8XczE-IM?si=ibxFNR5POWpet43C',
  'https://www.youtube.com/embed/8wPYRIy59ac?si=tNgM9mGcVorJRDDr',
  'https://www.youtube.com/embed/_AX9OHlOVYE?si=QO2nHlRQaBSxr7bV',
  'https://www.youtube.com/embed/GpmCIWb33GU?si=9RyKJqFK4B8ato-z',
  'https://www.youtube.com/embed/0Zra97sopNE?si=MV8SPKezbncroaMR',
  'https://www.youtube.com/embed/GTXHQjdQa24?si=H_hl9xX1lRBfI0Y4',
  'https://www.youtube.com/embed/26808Oq5tMk?si=K0KMhf7T_tof2r-6',
];

export default function GalleryPage() {
  const { t, dict } = useI18n();
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('gallery');
  const close = useCallback(() => setActiveIndex(null), []);

  const galleryImages = gallerySources.map((src, i) => ({
    src,
    alt: `${dict.gallery.photoAlt} ${i + 1}`,
  }));

  return (
    <main className="pt-20">
      <section className="py-8 md:py-16 bg-bg">
        <div className="safe-zone">
          <div className="mb-10">
            <h1
              className="text-text leading-tight"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 400 }}
            >
              {t('gallery.title')}
            </h1>
            <span className="overline">{t('gallery.eyebrow')}</span>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 border border-border rounded-sm mb-10 max-w-xs overflow-hidden">
            {[
              { key: 'gallery', label: t('gallery.tabs.photos') },
              { key: 'progress', label: t('gallery.tabs.progress') },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={[
                  'flex-1 py-2.5 px-4 text-sm transition-colors duration-150',
                  activeTab === tab.key
                    ? 'bg-accent text-white'
                    : 'text-text-muted hover:text-text',
                ].join(' ')}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'gallery' ? (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
              {galleryImages.map(({ src, alt }, i) => (
                <div
                  key={i}
                  className="break-inside-avoid mb-3 cursor-pointer overflow-hidden border border-border group relative"
                  onClick={() => setActiveIndex(i)}
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-bg-dark/0 group-hover:bg-bg-dark/35 transition-colors duration-300 flex items-center justify-center">
                    <span className="w-10 h-10 flex items-center justify-center border border-transparent group-hover:border-text-light/60 text-transparent group-hover:text-text-light transition-all duration-300 rounded-full">
                      <LuMaximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {workProgressVideos.map((url, i) => (
                <div key={i} className="aspect-video rounded-[4px] overflow-hidden border border-border">
                  <iframe
                    src={url}
                    title={`${dict.gallery.progressTitle} ${i + 1}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {activeTab === 'gallery' && (
        <Lightbox
          images={galleryImages}
          activeIndex={activeIndex}
          onClose={close}
          onSetIndex={setActiveIndex}
        />
      )}
    </main>
  );
}
