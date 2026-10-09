'use client';
import Link from 'next/link';
import { LuPlay, LuArrowRight } from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';

// `video` — { src, poster, width, height }: the first video of the "Napredak
// radova" album, resolved on the server. Renders nothing when there is none.
export const PromoVideo = ({ video }) => {
  const { t, href } = useI18n();
  if (!video?.src) return null;

  return (
    <section className="py-10 md:py-16 bg-bg-dark overflow-hidden">
      <div className="safe-zone flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
        <div className="md:flex-1" data-reveal>
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

        <div className="w-full max-w-[260px] mx-auto md:mx-0 flex-shrink-0" data-reveal>
          <video
            src={video.src}
            poster={video.poster || undefined}
            width={video.width || undefined}
            height={video.height || undefined}
            className="block w-full h-auto bg-bg-mid shadow-2xl"
            style={{ aspectRatio: video.width && video.height ? `${video.width}/${video.height}` : '9/16' }}
            controls
            playsInline
            preload="none"
            aria-label={t('promoVideo.title')}
          />
        </div>
      </div>
    </section>
  );
};
