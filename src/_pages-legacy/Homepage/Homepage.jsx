import { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Contact,
  Location,
  Partners,
  PaymentDynamic,
  ProjectShowcase,
  SEO,
  Showcase,
  Slider,
} from "@/components";
import "./Homepage.scss";
import { galleryImage26, galleryImage29, galleryImage4, video1, video2, video3 } from '@/assets/index';

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Avala Home Concept",
    "url": "https://avalahomeconcept.com",
    "telephone": "+381633833393",
    "email": "avalahomeconcept@gmail.com",
    "description": "Zatvoren kompleks porodičnih kuća na Avalskoj planini, 20 minuta od Beograda.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Beograd",
      "addressCountry": "RS"
    },
    "sameAs": [
      "https://www.facebook.com/avalahomeconcept/",
      "https://www.instagram.com/avala_homeconcept/",
      "https://rs.linkedin.com/in/avala-home-concept-718984276"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Avala Home Concept",
    "url": "https://avalahomeconcept.com",
    "inLanguage": "sr-RS",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://avalahomeconcept.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
];

const videos = [
  { src: video1, poster: galleryImage29, alt: "Avala Home Concept — video prikaz stambenog kompleksa na Avali" },
  { src: video2, poster: galleryImage4, alt: "Avala Home Concept — video prikaz kuće sa bazenom i dvorištem" },
  { src: video3, poster: galleryImage26, alt: "Avala Home Concept — video prikaz enterijera i detalja gradnje" },
];

const VideoThumbnail = ({ src, poster, alt, onOpen }) => (
  <div className="video-thumb" onClick={onOpen}>
    <img src={poster} alt={alt} className="video-thumb__poster" />
    <button className="video-thumb__play" aria-label="Play video">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
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
    <div className="video-lightbox" onClick={onClose}>
      <button className="video-lightbox__close" onClick={onClose} aria-label="Close">&#x2715;</button>
      <video
        ref={videoRef}
        src={video.src}
        poster={video.poster}
        controls
        className="video-lightbox__video"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export const Homepage = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const close = useCallback(() => setActiveVideo(null), []);

  return (
    <div className="homepage">
      <SEO
        title="Avala Home Concept"
        description="Plac, kuća, bazen, uređeno dvorište — 20 minuta od Beograda, 10 minuta od Ikee. Zatvoren kompleks porodičnih kuća na Avali. Pozovite: 063/383-393"
        path="/"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Slider />

      <div className="homepage__video-wrapper">
        <VideoThumbnail src={videos[0].src} poster={videos[0].poster} alt={videos[0].alt} onOpen={() => setActiveVideo(videos[0])} />
      </div>

      <Showcase />
      <ProjectShowcase />

      <div className="homepage__video-wrapper">
        <VideoThumbnail src={videos[1].src} poster={videos[1].poster} alt={videos[1].alt} onOpen={() => setActiveVideo(videos[1])} />
      </div>

      <Location />
      <PaymentDynamic />

      <div className="homepage__video-wrapper">
        <VideoThumbnail src={videos[2].src} poster={videos[2].poster} alt={videos[2].alt} onOpen={() => setActiveVideo(videos[2])} />
      </div>

      <Contact />
      <Partners />

      {activeVideo && <VideoLightbox video={activeVideo} onClose={close} />}
    </div>
  );
};
