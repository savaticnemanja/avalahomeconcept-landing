import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Lightbox, SEO } from "@/components";
import "./Project.scss";

export const Project = ({
  heroImage,
  mainImage,
  description,
  showcaseImages,
  surfaceArea,
  netSurfaceArea,
  seoTitle,
  seoDescription,
  seoPath,
}) => {
  const allImages = [
    { src: heroImage, alt: `${seoTitle} — eksterijerni prikaz` },
    { src: mainImage, alt: `${seoTitle} — osnova i plan kuće` },
    ...showcaseImages.map((src, i) => ({
      src,
      alt: `${seoTitle} — fotografija ${i + 1}`,
    })),
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const close = useCallback(() => setActiveIndex(null), []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": seoTitle,
    "description": seoDescription,
    "url": `https://avalahomeconcept.com${seoPath}`,
    "floorSize": { "@type": "QuantitativeValue", "value": surfaceArea, "unitCode": "MTK" },
    "numberOfRooms": 3,
    "address": { "@type": "PostalAddress", "addressLocality": "Beograd", "addressCountry": "RS" },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "Avala Home Concept" },
    },
  };

  return (
    <div className="project">
      <SEO title={seoTitle} description={seoDescription} path={seoPath} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="project__hero-image">
        <img
          src={heroImage}
          alt={allImages[0].alt}
          fetchpriority="high"
          className="project__clickable"
          onClick={() => setActiveIndex(0)}
        />
      </div>

      <div className="project__main">
        <img
          className="project__main-image project__clickable"
          src={mainImage}
          alt={allImages[1].alt}
          loading="lazy"
          decoding="async"
          onClick={() => setActiveIndex(1)}
        />
        <div className="project__main-description">{description}</div>
      </div>

      <div className="project__showcase-images">
        {showcaseImages.map((image, index) => (
          <div key={index} className="project__showcase-image">
            <img
              src={image}
              alt={allImages[index + 2].alt}
              loading="lazy"
              decoding="async"
              className="project__clickable"
              onClick={() => setActiveIndex(index + 2)}
            />
          </div>
        ))}
      </div>

      <div className="project__surface">
        <div className="project__surface-title">Površina</div>
        <div className="project__surface-value">{surfaceArea}m²</div>
      </div>

      <div className="project__net-surface">
        <div className="project__net-surface-title">NETO POVRŠINA</div>
        <ul />
      </div>

      <Lightbox
        images={allImages}
        activeIndex={activeIndex}
        onClose={close}
        onSetIndex={setActiveIndex}
      />
    </div>
  );
};
