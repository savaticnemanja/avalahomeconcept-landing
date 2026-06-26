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
  tower: '<path d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9"/><path d="M7.8 4.7a6.14 6.14 0 0 0-.8 7.5"/><circle cx="12" cy="9" r="2"/><path d="M16.2 4.8c2 2 2.26 5.11.8 7.47"/><path d="M19.1 1.9a9.96 9.96 0 0 1 0 14.1"/><path d="M9.5 18h5"/><path d="m8 22 4-11 4 11"/>',
};

const svgIcon = (paths) =>
  `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

DEVELOPMENT.icon = ICON.home;

const REGIONAL = [
  { name: 'Autoput',       icon: ICON.road,     time: '10 min', coords: [20.574612, 44.704578] },
  // IKEA and TC Ava sit beside each other at the Bubanj Potok retail area.
  { name: 'IKEA · TC Ava', icon: ICON.bag,      time: '10 min', coords: [20.56318, 44.710332] },
  { name: 'Autokomanda',   icon: ICON.route,    time: '20 min', coords: [20.4683739, 44.7908592] },
  // Republic Square — the city-centre reference point (northernmost pin).
  { name: 'Trg Republike', icon: ICON.landmark, time: '36 min', coords: [20.4599624, 44.816088] },
  // Avala Tower — landmark on Mount Avala, just north of the development.
  { name: 'Avalski toranj', icon: ICON.tower, coords: [20.514655, 44.6959552] },
];

// Which labels sit BELOW their dot (vs the default above). The desktop map is
// rotated ~54° and the mobile map is north-up, so their tight clusters differ —
// each breakpoint gets its own set, tuned so no two labels overlap. Keyed by
// pin name; the development ('Avala Home Concept') is always below so its
// amenity card hangs downward.
const BELOW_DESKTOP = new Set(['Avala Home Concept', 'IKEA · TC Ava', 'Autokomanda']);
const BELOW_MOBILE = new Set(['Avala Home Concept', 'Autoput']);

// CARTO Voyager — a colourful Google-Maps-style basemap (free raster tiles, no
// API key): green parks/landcover, blue water, soft roads. Rendered at full
// opacity with natural saturation so the greens read true.
const MAP_STYLE = {
  version: 8,
  sources: {
    basemap: {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
        'https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
        'https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
        'https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
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
        'raster-opacity': 1,
      },
    },
  ],
};

// Padding chosen so no pin OR its label/card clips on either breakpoint.
// Desktop is tighter (rotated + zoomed in to fill the frame); the wider sides
// keep the long "Avala Home Concept" label, which lands at a horizontal end of
// the rotated axis, off the edge across desktop widths.
const fitPadding = (w) =>
  w < 768
    ? { top: 96, bottom: 150, left: 56, right: 56 } // bottom: room for the amenity card under the home pin
    : { top: 40, bottom: 120, left: 96, right: 96 }; // sides just clear the end labels; bottom clears the home card

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
      // Desktop is landscape, but the pins' natural spread is roughly N–S.
      // Rotating the map ~60° turns that spread into the frame's diagonal, so
      // the pins fill BOTH dimensions and sit close to the edges (tight padding,
      // higher zoom). A maxZoom cap keeps ultra-wide screens from pushing the
      // end labels off-frame.
      // Mobile is portrait and stays north-up (vertical) — a rotated span
      // there would waste vertical room and clip the end pins.
      const fitAll = () =>
        map.fitBounds(bounds, {
          padding: fitPadding(window.innerWidth),
          bearing: window.innerWidth < 768 ? 0 : 60,
          // High cap: let fitBounds zoom to actually fill wide desktops. It
          // can't clip — every label/card sits inside the padding reserved
          // below, so framing the dots within the padding keeps them on-screen.
          maxZoom: window.innerWidth < 768 ? 13.5 : 15,
          duration: 0,
        });

      // One pin style for every place — a floating label tag (icon + name)
      // connected by a thin line to a dot at the exact point. The dot is the
      // anchor; `below` flips the label under the dot so close neighbours don't
      // collide. The development gets the same pin, marked by `is-home`.
      const addPin = (loc, below, extra = '') => {
        const time = loc.time ? `<span class="tm">${loc.time}</span>` : '';
        const label = `<span class="lbl">${svgIcon(loc.icon)}<span class="t">${loc.name}</span>${time}</span>`;
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
        return new maplibregl.Marker({ element: el, anchor: below ? 'top' : 'bottom' })
          .setLngLat(loc.coords)
          .addTo(map);
      };

      // Rebuild the markers with the placement set for the current breakpoint
      // (desktop rotated vs north-up mobile cluster the pins differently).
      const markers = [];
      const renderMarkers = (mobile) => {
        markers.forEach((m) => m.remove());
        markers.length = 0;
        const below = mobile ? BELOW_MOBILE : BELOW_DESKTOP;
        markers.push(addPin(DEVELOPMENT, below.has(DEVELOPMENT.name), ' is-home'));
        REGIONAL.forEach((loc) => markers.push(addPin(loc, below.has(loc.name))));
      };
      let isMobile = window.innerWidth < 768;
      renderMarkers(isMobile);

      map.once('load', fitAll);

      // Keep the framing correct on mobile: the container can receive its final
      // height AFTER the map inits, and the window 'resize' event may never fire
      // (orientation change, address-bar show/hide, tab switches). A
      // ResizeObserver re-measures and re-fits whenever the container resizes,
      // so every pin stays in view. It also fires once on observe → initial fit.
      const refit = () => {
        if (!map) return;
        const mobile = window.innerWidth < 768;
        if (mobile !== isMobile) {
          isMobile = mobile;
          renderMarkers(mobile); // swap to the breakpoint's placement set
        }
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
