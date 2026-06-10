import { useState, useCallback } from "react";
import { Lightbox, SEO } from "@/components";
import { images } from "./constants";
import "./Gallery.scss";

const lightboxImages = images.map((src, i) => ({
  src,
  alt: `Avala Home Concept — galerija, fotografija ${i + 1}`,
}));

export const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const close = useCallback(() => setActiveIndex(null), []);

  return (
    <div className="gallery">
      <SEO
        title="Galerija"
        description="Pogledajte fotografije kuća, dvorišta i enterijera Avala Home Concept — luksuzni stambeni kompleks na Avalskoj planini."
        path="/gallery"
      />
      <h1 className="gallery__title">Galerija</h1>
      <div className="gallery__images">
        {lightboxImages.map(({ src, alt }, index) => (
          <img
            key={index}
            src={src}
            alt={alt}
            className="gallery__image"
            loading="lazy"
            decoding="async"
            onClick={() => setActiveIndex(index)}
          />
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
