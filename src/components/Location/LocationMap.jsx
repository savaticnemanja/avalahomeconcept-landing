'use client';
import { useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';

// ─── Map data ───────────────────────────────────────────────────────
// Coordinates are [lng, lat].
//
// The development is resolved from the real Google Maps pin. Per the
// developer, the everyday amenities (markets, school, clinic, city bus)
// all sit within ~300 m of the site, so they're folded into the home
// marker — at a regional zoom they'd otherwise stack on one pixel.
//
// REGIONAL pins are the further destinations. `off` is a pixel [x, y]
// nudge for the label so neighbours don't overlap. Coordinates marked
// "approx" below are best-effort — send a Google pin to make them exact.
const DEVELOPMENT = {
  name: 'Avala Home Concept',
  near: 'Marketi · škola · ambulanta · gradski prevoz — 2–5 min',
  coords: [20.546269, 44.648637],
};

const REGIONAL = [
  { name: 'Autoput',       time: '10 min', coords: [20.5175, 44.7150], off: [0, -15] }, // approx (A1 pristup)
  // IKEA and TC Ava sit ~500 m apart at the same retail area — one pin.
  // Label points DOWN so it clears Autokomanda above it.
  { name: 'IKEA · TC Ava', time: '10 min', coords: [20.5147, 44.7656], off: [0, 18] },
  // Label offset to the side to dodge both Vračar (above) and IKEA (below).
  { name: 'Autokomanda',   time: '20 min', coords: [20.4760, 44.7873], off: [58, 0] },
  { name: 'Vračar',        time: '20 min', coords: [20.4730, 44.7990], off: [0, -15] },
];

// OpenStreetMap raster basemap. Warmed to the site palette via a slight
// desaturation + transparency that lets the cream container colour show
// through (markers sit above the raster and stay crisp).
const OSM_STYLE = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: [
        'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      maxzoom: 19,
      attribution: '© OpenStreetMap contributors',
    },
  },
  layers: [
    {
      id: 'osm',
      type: 'raster',
      source: 'osm',
      paint: {
        'raster-opacity': 0.82,
        'raster-saturation': -0.45,
        'raster-contrast': -0.08,
        'raster-brightness-min': 0.08,
      },
    },
  ],
};

// Generous padding so no pin OR its offset label clips, on either breakpoint.
const fitPadding = (w) =>
  w < 768
    ? { top: 64, bottom: 118, left: 56, right: 56 }
    : { top: 48, bottom: 92, left: 90, right: 90 }; // tighter top/bottom = zoomed in a bit

export const LocationMap = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let map;
    let cancelled = false;

    (async () => {
      const maplibregl = (await import('maplibre-gl')).default;
      if (cancelled || !containerRef.current) return;

      map = new maplibregl.Map({
        container: containerRef.current,
        style: OSM_STYLE,
        center: DEVELOPMENT.coords,
        zoom: 12,
        interactive: false,          // disables pan/zoom/rotate + all control gestures
        attributionControl: false,   // we render a static credit instead
      });

      // Frame every pin (development + all regional destinations) in view.
      const all = [DEVELOPMENT.coords, ...REGIONAL.map((l) => l.coords)];
      const bounds = all.reduce(
        (b, c) => b.extend(c),
        new maplibregl.LngLatBounds(all[0], all[0]),
      );
      const fitAll = () =>
        map.fitBounds(bounds, {
          padding: fitPadding(window.innerWidth),
          maxZoom: 13.5,
          duration: 0,
        });

      // Development marker (carries the within-300 m amenities).
      const homeEl = document.createElement('div');
      homeEl.className = 'ahc-home-pill';
      homeEl.innerHTML =
        '<span class="ahc-home-dot"></span>' +
        '<span class="ahc-home-txt">' +
        `<span class="nm">${DEVELOPMENT.name}</span>` +
        `<span class="sub">${DEVELOPMENT.near}</span>` +
        '</span>';
      new maplibregl.Marker({ element: homeEl, anchor: 'top', offset: [0, 12] })
        .setLngLat(DEVELOPMENT.coords)
        .addTo(map);

      // Regional markers — each carries its own always-visible label.
      REGIONAL.forEach((loc) => {
        const el = document.createElement('div');
        el.className = 'ahc-poi-pill';
        el.innerHTML =
          `<span class="dot"></span><span class="nm">${loc.name}</span><span class="tm">${loc.time}</span>`;
        new maplibregl.Marker({ element: el, anchor: 'center', offset: loc.off })
          .setLngLat(loc.coords)
          .addTo(map);
      });

      map.once('load', fitAll);
      window.addEventListener('resize', fitAll);
      map.__fitAll = fitAll;
    })();

    return () => {
      cancelled = true;
      if (map) {
        window.removeEventListener('resize', map.__fitAll);
        map.remove();
      }
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden border border-border"
      style={{ borderRadius: '2px', backgroundColor: 'var(--color-bg)' }}
    >
      <div ref={containerRef} className="ahc-map w-full h-[470px] md:h-[600px]" />

      <span
        className="absolute bottom-1.5 right-2 z-10 text-[0.6rem] text-text-muted/70 pointer-events-none select-none"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        © OpenStreetMap contributors
      </span>
    </div>
  );
};
