'use client';
import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { LuMaximize2, LuImages, LuArrowRight, LuPlay } from 'react-icons/lu';
import { Lightbox } from '@/components';
import { useI18n } from '@/i18n/I18nProvider';
import { imageUrl } from '@/lib/imageUrl';
import { youtubeEmbedUrl, youtubeThumb } from '@/lib/youtube';
import { pick } from '@/lib/localize';

export default function GalleryClient({ categories }) {
  const { t, dict, locale, href } = useI18n();
  const [activeIndex, setActiveIndex] = useState(null);

  const tabs = useMemo(() => categories.filter((c) => c.images.length > 0), [categories]);
  const [activeTab, setActiveTab] = useState(() => tabs[0]?.slug ?? null);

  const close = useCallback(() => setActiveIndex(null), []);

  const activeCategory = tabs.find((c) => c.slug === activeTab) ?? tabs[0];
  const items = (activeCategory?.images ?? []).map((img, i) => {
    const kind = img.kind === 'video' || img.kind === 'youtube' ? img.kind : 'image';
    const alt = pick(img, 'caption', locale) || `${dict.gallery.photoAlt} ${i + 1}`;
    if (kind === 'youtube') {
      return { kind, src: youtubeEmbedUrl(img.filename), poster: youtubeThumb(img.filename), alt };
    }
    return {
      kind,
      src: imageUrl(img.filename),
      poster: img.poster ? imageUrl(img.poster) : null,
      alt,
    };
  });

  return (
    <main className="pt-20">
      <section className="py-12 md:py-16 bg-bg">
        <div className="safe-zone">
          <div className="mb-10">
            <span className="overline"><LuImages />{t('gallery.eyebrow')}</span>
            <h1 className="text-text leading-tight" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 400 }}>
              {t('gallery.title')}
            </h1>
          </div>

          {tabs.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {tabs.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => { setActiveTab(cat.slug); setActiveIndex(null); }}
                  className={[
                    'py-2.5 px-5 text-sm rounded-sm border transition-colors duration-150',
                    activeCategory?.slug === cat.slug
                      ? 'bg-accent text-white border-accent'
                      : 'text-text-muted border-border hover:text-text',
                  ].join(' ')}
                >
                  {pick(cat, 'name', locale)}
                </button>
              ))}
            </div>
          )}

          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
            {items.map(({ kind, src, poster, alt }, i) => {
              const playable = kind === 'video' || kind === 'youtube';
              const thumb = playable ? poster : src;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={alt}
                  className="block w-full break-inside-avoid mb-3 cursor-pointer overflow-hidden border border-border group relative"
                  onClick={() => setActiveIndex(i)}
                >
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumb}
                      alt={alt}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  ) : (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video src={src} className="w-full h-auto object-cover" muted preload="metadata" />
                  )}
                  <span className="absolute inset-0 bg-bg-dark/0 group-hover:bg-bg-dark/35 transition-colors duration-300 flex items-center justify-center">
                    <span className="w-10 h-10 flex items-center justify-center border border-transparent group-hover:border-text-light/60 text-transparent group-hover:text-text-light transition-all duration-300 rounded-full">
                      <LuMaximize2 className="w-4 h-4" />
                    </span>
                  </span>
                  {playable && (
                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="w-12 h-12 flex items-center justify-center rounded-full bg-black/55 text-white group-hover:bg-accent transition-colors duration-300">
                        <LuPlay className="w-5 h-5 translate-x-0.5" />
                      </span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="py-8 md:py-16 bg-bg border-t border-border">
        <div className="safe-zone flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-text italic" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem,2.5vw,1.8rem)', fontWeight: 400 }}>
            {t('midCta.text')}
          </p>
          <Link href={href('/contact')} className="btn-primary group flex-shrink-0">
            {t('midCta.requestOffer')}
            <span className="btn-arrow flex items-center"><LuArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>
      </div>

      <Lightbox images={items} activeIndex={activeIndex} onClose={close} onSetIndex={setActiveIndex} />
    </main>
  );
}
