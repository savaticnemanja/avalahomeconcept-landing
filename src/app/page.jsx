'use client';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Contact,
  FAQ,
  Location,
  Partners,
  PaymentDynamic,
  ProjectShowcase,
  Showcase,
  Slider,
} from '@/components';
import { specifications } from '@/lib/specifications';
import galleryImage26 from '@/assets/gallery/gallery-26.webp';
import galleryImage29 from '@/assets/gallery/gallery-29.webp';
import galleryImage4 from '@/assets/gallery/gallery-4.webp';
import video1 from '@/assets/homepage/video1.mp4';
import video2 from '@/assets/homepage/video2.mp4';
import video3 from '@/assets/homepage/video3.mov';

const VideoThumbnail = ({ poster, alt, onOpen }) => (
  <div
    className="relative cursor-pointer overflow-hidden rounded-[4px] group"
    onClick={onOpen}
    role="button"
    aria-label={`Reprodukuj: ${alt}`}
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={typeof poster === 'string' ? poster : poster.src}
      alt={alt}
      className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-bg-dark/25 flex items-center justify-center group-hover:bg-bg-dark/15 transition-colors duration-200">
      <div className="w-18 h-18 rounded-full bg-accent/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg"
           style={{ width: '72px', height: '72px' }}>
        <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 ml-1" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  </div>
);

const VideoLightbox = ({ video, onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (el) el.play().catch(() => {});
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-bg-dark/95 flex items-center justify-center" onClick={onClose}>
      <button
        className="absolute top-4 right-4 text-text-light text-3xl leading-none hover:text-accent transition-colors"
        onClick={onClose}
        aria-label="Zatvori"
      >
        &#x2715;
      </button>
      <video
        ref={videoRef}
        src={video.src}
        poster={typeof video.poster === 'string' ? video.poster : video.poster.src}
        controls
        className="max-w-[90vw] max-h-[80vh] rounded-[4px]"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default function HomePage() {
  const [activeVideo, setActiveVideo] = useState(null);
  const close = useCallback(() => setActiveVideo(null), []);

  const videos = [
    { src: video1, poster: galleryImage29, alt: 'Avala Home Concept — video prikaz stambenog kompleksa' },
    { src: video2, poster: galleryImage4, alt: 'Avala Home Concept — video prikaz kuće sa bazenom' },
    { src: video3, poster: galleryImage26, alt: 'Avala Home Concept — video prikaz enterijera' },
  ];

  return (
    <>
      {/* 1. Hero slider */}
      <Slider />

      {/* 2. Video #1 */}
      <section className="py-6 md:py-12 bg-bg">
        <div className="safe-zone">
          <VideoThumbnail
            poster={videos[0].poster}
            alt={videos[0].alt}
            onOpen={() => setActiveVideo(videos[0])}
          />
        </div>
      </section>

      {/* 3. CTA ispod prvog videa — 4.3 */}
      <div className="py-10 md:py-20 bg-bg border-t border-border">
        <div className="safe-zone flex flex-col items-center gap-5 text-center">
          <span className="overline" style={{ display: 'block' }}>Kontaktirajte nas</span>
          <h3
            className="text-text italic max-w-lg"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 400 }}
          >
            Zainteresovani za kompleks?
          </h3>
          <p className="text-text-muted text-sm font-light max-w-sm">
            Naš tim je na raspolaganju za sve informacije, obilaske i rezervacije.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link href="/contact" className="btn-primary group">
              Zatražite ponudu
              <span className="btn-arrow"><svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/></svg></span>
            </Link>
            <a href="tel:+38163383393" className="btn-ghost group">
              Pozovite odmah
            </a>
          </div>
        </div>
      </div>

      {/* 4. Showcase sa benefitima — 4.2 */}
      <Showcase />

      {/* 5. ProjectShowcase slider — 4.4 */}
      <ProjectShowcase />

      {/* 6. Specifikacije — 4.10 */}
      <section className="py-12 md:py-24 bg-bg-dark">
        <div className="safe-zone">
          <div className="section-header-centered">
            <span className="overline" style={{ display: 'block' }}>Kvalitet gradnje</span>
            <div className="overline-bar-center" />
            <h2
              className="text-text-light leading-tight"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400 }}
            >
              Specifikacije
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border-dark">
            {specifications.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-bg-dark flex flex-col gap-3 md:gap-4 p-4 md:p-7 group hover:bg-bg-mid transition-colors duration-200"
                >
                  <span className="w-10 h-10 flex items-center justify-center border border-border-dark rounded-full text-text-light/30 group-hover:border-accent/50 group-hover:text-accent transition-all duration-200">
                    <Icon className="w-4 h-4" />
                  </span>
                  <h4
                    className="text-text-light"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 400 }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-text-light/40 text-sm font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Video #2 */}
      <section className="py-6 md:py-12 bg-bg-alt">
        <div className="safe-zone">
          <VideoThumbnail
            poster={videos[1].poster}
            alt={videos[1].alt}
            onOpen={() => setActiveVideo(videos[1])}
          />
        </div>
      </section>

      {/* 8. Lokacija */}
      <Location />

      {/* 9. Dinamika plaćanja — 4.6 */}
      <PaymentDynamic />

      {/* 10. CTA ispod PaymentDynamic — 4.1 */}
      <div className="py-8 md:py-16 bg-bg border-t border-border">
        <div className="safe-zone flex flex-col sm:flex-row items-center justify-between gap-6">
          <p
            className="text-text italic"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem,2.5vw,1.8rem)', fontWeight: 400 }}
          >
            Rezervišite vašu kuću danas.
          </p>
          <Link href="/contact" className="btn-primary group flex-shrink-0">
            Zatraži ponudu
            <span className="btn-arrow"><svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/></svg></span>
          </Link>
        </div>
      </div>

      {/* 11. Video #3 */}
      <section className="py-6 md:py-12 bg-bg">
        <div className="safe-zone">
          <VideoThumbnail
            poster={videos[2].poster}
            alt={videos[2].alt}
            onOpen={() => setActiveVideo(videos[2])}
          />
        </div>
      </section>

      {/* 12. FAQ — 4.7 */}
      <FAQ />

      {/* 13. Kontakt */}
      <Contact />

      {/* 14. Partneri */}
      <Partners />

      {activeVideo && <VideoLightbox video={activeVideo} onClose={close} />}
    </>
  );
}
