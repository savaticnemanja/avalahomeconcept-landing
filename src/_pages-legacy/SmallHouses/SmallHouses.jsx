import { useState, useCallback } from "react";
import { Lightbox, SEO } from "@/components";
import {
  smallHousesVideo,
  smallHousesMain,
  smallHousesInfo1,
  smallHousesInfo2,
  smallHousesGallery1,
  smallHousesGallery2,
  smallHousesGallery3,
  smallHousesGallery4,
  smallHousesGallery5,
  smallHousesGallery6,
} from "@/assets/index";
import "./SmallHouses.scss";

const lightboxImages = [
  { src: smallHousesMain,     alt: "Avala Home Concept — kuće 80–100m², eksterijerni prikaz" },
  { src: smallHousesInfo1,    alt: "Kuće 80–100m² — informacije o tipu kuće, Avala Home Concept" },
  { src: smallHousesInfo2,    alt: "Kuće 80–100m² — detalji ponude i specifikacije" },
  { src: smallHousesGallery1, alt: "Avala Home Concept — kuće 80–100m², eksterijerni pogled 1" },
  { src: smallHousesGallery2, alt: "Avala Home Concept — kuće 80–100m², eksterijerni pogled 2" },
  { src: smallHousesGallery3, alt: "Avala Home Concept — kuće 80–100m², eksterijerni pogled 3" },
  { src: smallHousesGallery4, alt: "Avala Home Concept — kuće 80–100m², detalj dvorišta" },
  { src: smallHousesGallery5, alt: "Avala Home Concept — kuće 80–100m², detalj enterijera" },
  { src: smallHousesGallery6, alt: "Avala Home Concept — kuće 80–100m², pogled na okolinu" },
];

export const SmallHouses = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const close = useCallback(() => setActiveIndex(null), []);

  return (
    <div className="small-houses">
      <SEO
        title="Kuće 80–100m²"
        description="Kompaktne kuće od 80 do 100m² u zatvorenom kompleksu na Avali — moderna arhitektura, visok kvalitet gradnje, 20 min od Beograda."
        path="/small-houses"
      />

      <div className="small-houses__hero-image">
        <img
          src={smallHousesMain}
          alt={lightboxImages[0].alt}
          fetchpriority="high"
          className="small-houses__clickable"
          onClick={() => setActiveIndex(0)}
        />
      </div>

      <div className="small-houses__main">
        <img
          className="small-houses__main-image small-houses__clickable"
          src={smallHousesInfo1}
          alt={lightboxImages[1].alt}
          loading="lazy"
          decoding="async"
          onClick={() => setActiveIndex(1)}
        />
        <img
          className="small-houses__main-image small-houses__clickable"
          src={smallHousesInfo2}
          alt={lightboxImages[2].alt}
          loading="lazy"
          decoding="async"
          onClick={() => setActiveIndex(2)}
        />
      </div>

      <video controls poster={smallHousesMain} preload="none" width="100%">
        <source src={smallHousesVideo} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      <div className="small-houses__showcase-images">
        {lightboxImages.slice(3).map(({ src, alt }, i) => (
          <div key={i} className="small-houses__showcase-image">
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="small-houses__clickable"
              onClick={() => setActiveIndex(i + 3)}
            />
          </div>
        ))}
      </div>

      <Lightbox
        images={lightboxImages}
        activeIndex={activeIndex}
        onClose={close}
        onSetIndex={setActiveIndex}
      />
    </div>
  );
};
