'use client';
import { useState } from 'react';
import Link from 'next/link';
import { LuPlay, LuArrowRight } from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';

// `video` — { src, poster, width, height }: the first video of the "Napredak
// radova" album, resolved on the server. Renders nothing when there is none.
// The clip is portrait, so it sits centred in a wide card over a blurred copy
// of its poster instead of being cropped; clicking plays it in place.
export const PromoVideo = ({ video }) => {
  const { t, href } = useI18n();
  const [playing, setPlaying] = useState(false);
  if (!video?.src) return null;

  const ratio = video.width && video.height ? `${video.width}/${video.height}` : '9/16';

  return (
    <section className="py-10 md:py-16 bg-bg-dark overflow-hidden">
      <div className="safe-zone grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center gap-8 md:gap-14">
        <div data-reveal>
          <span className="overline"><LuPlay />{t('promoVideo.eyebrow')}</span>
          <h2
            className="text-text-light"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,3.2vw,2.8rem)', fontWeight: 400 }}
          >
            {t('promoVideo.title')}
          </h2>
          <p className="text-text-light/65 text-sm md:text-base font-light max-w-md mt-3">
            {t('promoVideo.text')}
          </p>
          <Link href={href('/gallery?tab=progress')} className="btn-outline-light inline-flex group mt-6 md:mt-8">
            {t('promoVideo.cta')}
            <span className="btn-arrow flex items-center"><LuArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>

        <div
          className="relative overflow-hidden bg-bg-mid aspect-[4/5] sm:aspect-[16/10] border border-border-dark shadow-2xl"
          data-reveal
        >
          {video.poster && (
            <img
              src={video.poster}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover scale-125 blur-2xl opacity-60"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/70 via-bg-dark/20 to-bg-dark/70" />

          <div className="absolute inset-0 flex justify-center py-4 md:py-6">
            {playing ? (
              <video
                src={video.src}
                poster={video.poster || undefined}
                className="h-full w-auto max-w-full bg-bg-dark shadow-2xl"
                style={{ aspectRatio: ratio }}
                controls
                autoPlay
                playsInline
                aria-label={t('promoVideo.title')}
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                tabIndex={-1}
                aria-hidden="true"
                className="group relative h-full max-w-full overflow-hidden shadow-2xl"
                style={{ aspectRatio: ratio }}
              >
                {video.poster && (
                  <img
                    src={video.poster}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <span className="absolute inset-0 bg-bg-dark/15 transition-colors duration-300 group-hover:bg-bg-dark/30" />
              </button>
            )}
          </div>

          {!playing && (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={t('promoVideo.title')}
              className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-accent text-text-light shadow-2xl transition-transform duration-300 hover:scale-110"
            >
              <span className="absolute inset-0 rounded-full bg-accent/50 animate-ping" aria-hidden="true" />
              <LuPlay className="relative h-6 w-6 md:h-7 md:w-7 translate-x-0.5 fill-current" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
