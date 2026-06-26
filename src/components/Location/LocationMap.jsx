'use client';
import { useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';

// ─── Map data ───────────────────────────────────────────────────────
// Coordinates are [lng, lat]. The development uses the same floating-label
// pin as every other destination, marked only by a house icon.
//
// REGIONAL pins are the further destinations — name-only floating labels.
// Coordinates marked "approx" below are best-effort — send a Google pin to
// make them exact.
const DEVELOPMENT = {
  name: 'Avala Home Concept',
  coords: [20.546269, 44.648637],
  // Label + amenity card hang BELOW the dot (south), so they don't collide
  // with Autoput's label, which sits at nearly the same longitude just north.
  place: 'bottom',
  // Everyday amenities within ~300 m — shown as a small card beneath the pin.
  amenities: [
    { name: 'Marketi · javni prevoz', time: '1 min' },
    { name: 'Ambulanta',              time: '5 min' },
    { name: 'Škola',                  time: '5 min' },
  ],
};

// Lucide-style icon path markup (inner SVG only — wrapped by svgIcon() below).
// Inlined as strings because the markers are built via innerHTML, not React.
const ICON = {
  home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  road: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  landmark: '<polygon points="12 2 20 7 4 7"/><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/>',
};

const svgIcon = (paths) =>
  `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

DEVELOPMENT.icon = ICON.home;

const REGIONAL = [
  // Autoput sits just SE of IKEA — label flipped below so the two don't collide.
  { name: 'Autoput',       icon: ICON.road,     coords: [20.574612, 44.704578], place: 'bottom' },
  // IKEA and TC Ava sit beside each other at the Bubanj Potok retail area.
  { name: 'IKEA · TC Ava', icon: ICON.bag,      coords: [20.56318, 44.710332] },
  { name: 'Autokomanda',   icon: ICON.route,    coords: [20.4683739, 44.7908592] },
  // Republic Square — the city-centre reference point (northernmost pin).
  { name: 'Trg Republike', icon: ICON.landmark, coords: [20.4599624, 44.816088] },
];

// CARTO Positron — a clean, minimal light basemap (free raster tiles, no API
// key). Lightly warmed toward the site palette: a touch of transparency lets
// the cream container colour show through, and markers stay crisp above it.
const MAP_STYLE = {
  version: 8,
  sources: {
    basemap: {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        'https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        'https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      maxzoom: 20,
      attribution: '© OpenStreetMap contributors © CARTO',
    },
  },
  layers: [
    {
      id: 'basemap',
      type: 'raster',
      source: 'basemap',
      paint: {
        'raster-opacity': 0.92,
        'raster-saturation': -0.1,
      },
    },
  ],
};

// Generous padding so no pin OR its offset label clips, on either breakpoint.
const fitPadding = (w) =>
  w < 768
    ? { top: 96, bottom: 150, left: 56, right: 56 } // bottom: room for the amenity card under the home pin
    : { top: 80, bottom: 128, left: 90, right: 90 };

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
        style: MAP_STYLE,
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

      // One pin style for every place — a floating label tag (icon + name)
      // connected by a thin line to a dot at the exact point. The dot is the
      // anchor. By default the label sits ABOVE the dot; pins flagged
      // `place: 'bottom'` flip the label BELOW so close neighbours don't
      // collide. The development gets the same pin, marked by `is-home`.
      const addPin = (loc, extra = '') => {
        const below = loc.place === 'bottom';
        const label = `<span class="lbl">${svgIcon(loc.icon)}<span class="t">${loc.name}</span></span>`;
        const parts = below
          ? '<span class="dot"></span><span class="line"></span>' + label
          : label + '<span class="line"></span><span class="dot"></span>';
        // Optional amenity card — absolutely positioned beneath the dot so it
        // hangs below the pin without shifting the dot off its coordinate.
        const info = loc.amenities
          ? '<div class="ahc-poi-info">' +
            loc.amenities
              .map(
                (a) =>
                  `<span class="row"><span class="al">${a.name}</span><span class="at">${a.time}</span></span>`,
              )
              .join('') +
            '</div>'
          : '';
        const el = document.createElement('div');
        el.className = `ahc-poi-pin${extra}`;
        el.innerHTML = `<div class="ahc-poi-inner">${parts}${info}</div>`;
        new maplibregl.Marker({ element: el, anchor: below ? 'top' : 'bottom' })
          .setLngLat(loc.coords)
          .addTo(map);
      };

      addPin(DEVELOPMENT, ' is-home');
      REGIONAL.forEach((loc) => addPin(loc));

      map.once('load', fitAll);

      // Keep the framing correct on mobile: the container can receive its final
      // height AFTER the map inits, and the window 'resize' event may never fire
      // (orientation change, address-bar show/hide, tab switches). A
      // ResizeObserver re-measures and re-fits whenever the container resizes,
      // so every pin stays in view. It also fires once on observe → initial fit.
      const refit = () => {
        if (!map) return;
        map.resize();
        fitAll();
      };
      let ro;
      if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
        ro = new ResizeObserver(refit);
        ro.observe(containerRef.current);
      } else {
        window.addEventListener('resize', refit);
      }
      map.__cleanup = () => {
        if (ro) ro.disconnect();
        else window.removeEventListener('resize', refit);
      };
    })();

    return () => {
      cancelled = true;
      if (map) {
        map.__cleanup?.();
        map.remove();
      }
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden border border-border"
      style={{ borderRadius: '2px', backgroundColor: 'var(--color-bg)' }}
    >
      <div ref={containerRef} className="ahc-map w-full h-[520px] md:h-[600px]" />

      <span
        className="absolute bottom-1.5 right-2 z-10 text-[0.6rem] text-text-muted/70 pointer-events-none select-none"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        © OpenStreetMap · © CARTO
      </span>
    </div>
  );
};
