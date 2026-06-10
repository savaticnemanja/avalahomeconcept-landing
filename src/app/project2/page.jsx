'use client';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import { Lightbox } from '@/components';
import { projects } from '@/lib/projects';

const project = projects[1];

const allImages = [
  { src: project.heroImage, alt: `${project.seoTitle} — eksterijerni prikaz` },
  { src: project.mainImage, alt: `${project.seoTitle} — osnova i plan kuće` },
  ...project.showcaseImages.map((src, i) => ({
    src,
    alt: `${project.seoTitle} — fotografija ${i + 1}`,
  })),
];

export default function Project2Page() {
  const [activeIndex, setActiveIndex] = useState(null);
  const close = useCallback(() => setActiveIndex(null), []);

  return (
    <main className="pt-20">
      {/* Hero */}
      <div
        className="relative h-[60vh] min-h-[400px] overflow-hidden cursor-pointer"
        onClick={() => setActiveIndex(0)}
      >
        <Image
          src={allImages[0].src}
          alt={allImages[0].alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-bg-dark/30" />
        <div className="absolute inset-0 flex items-end pb-12">
          <div className="safe-zone">
            <span className="overline">Naša ponuda</span>
            <h1
              className="text-text-light leading-tight"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 400 }}
            >
              {project.seoTitle}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-8 md:py-16 bg-bg">
        <div className="safe-zone">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div
              className="cursor-pointer rounded-[4px] overflow-hidden border border-border hover:shadow-lg transition-shadow duration-200"
              onClick={() => setActiveIndex(1)}
            >
              <Image
                src={allImages[1].src}
                alt={allImages[1].alt}
                width={600}
                height={500}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-text-muted font-light leading-relaxed">{project.description}</p>
              <div className="border-t border-border pt-6">
                <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-accent mb-4">
                  Neto površina
                </p>
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    {project.netSurfaceArea.map((row, i) => (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        <td className="py-2 font-light text-text">{row.name}</td>
                        <td className="py-2 text-right text-text-muted font-light">{row.area}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                  <span className="text-sm font-medium text-text">Ukupno</span>
                  <span className="text-accent font-medium">{project.surfaceArea} m²</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-8 md:pb-16 bg-bg">
        <div className="safe-zone">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.showcaseImages.map((img, i) => (
              <div
                key={i}
                className="cursor-pointer rounded-[4px] overflow-hidden border border-border hover:-translate-y-[2px] hover:shadow-md transition-all duration-200"
                onClick={() => setActiveIndex(i + 2)}
              >
                <Image
                  src={img}
                  alt={allImages[i + 2].alt}
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
        images={allImages}
        activeIndex={activeIndex}
        onClose={close}
        onSetIndex={setActiveIndex}
      />
    </main>
  );
}
