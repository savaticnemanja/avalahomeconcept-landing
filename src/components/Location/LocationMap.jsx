'use client';
import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { LuMapPin, LuClock } from 'react-icons/lu';

// Free, no-token vector tiles (OpenFreeMap) — includes building data for 3D.
const STYLE_URL = 'https://tiles.openfreemap.org/styles/positron';

/**
 * ⚠️ APPROXIMATE COORDINATES — replace with real values.
 * Order is [longitude, latitude]. The DEVELOPMENT pin is the anchor; the
 * camera opens here and "Resetuj prikaz" returns to it.
 */
const DEVELOPMENT = { name: 'Avala Home Concept', coords: [20.516, 44.692] };

const locations = [
  { name: 'Autoput',        time: '10 min', category: 'transport', coords: [20.5050, 44.7100] },
  { name: 'Ikea',           time: '10 min', category: 'shopping',  coords: [20.5093, 44.7236] },
  { name: 'Marketi',        time: '2 min',  category: 'shopping',  coords: [20.5145, 44.6945] },
  { name: 'TC Ava',         time: '10 min', category: 'shopping',  coords: [20.5130, 44.7270] },
  { name: 'Škola',          time: '5 min',  category: 'education', coords: [20.5120, 44.6975] },
  { name: 'Autokomanda',    time: '20 min', category: 'transport', coords: [20.4760, 44.7866] },
  { name: 'Vračar',         time: '20 min', category: 'city',      coords: [20.4690, 44.7980] },
  { name: 'Ambulanta',      time: '5 min',  category: 'health',    coords: [20.5180, 44.6960] },
  { name: 'Gradski prevoz', time: '2 min',  category: 'transport', coords: [20.5150, 44.6930] },
];

export const LocationMap = () => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE_URL,
      center: DEVELOPMENT.coords,
      zoom: 14.5,
      pitch: 58,
      bearing: -18,
      antialias: true,
      attributionControl: false,
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
    map.addControl(new maplibregl.AttributionControl({ compact: true }));
    map.scrollZoom.disable();

    map.on('load', () => {
      // ── 3D extruded buildings ─────────────────────────────────
      const firstSymbol = map.getStyle().layers.find((l) => l.type === 'symbol')?.id;
      if (!map.getLayer('3d-buildings')) {
        map.addLayer(
          {
            id: '3d-buildings',
            source: 'openmaptiles',
            'source-layer': 'building',
            type: 'fill-extrusion',
            minzoom: 13,
            paint: {
              'fill-extrusion-color': '#d9d3c7',
              'fill-extrusion-height': ['coalesce', ['get', 'render_height'], 6],
              'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], 0],
              'fill-extrusion-opacity': 0.85,
            },
          },
          firstSymbol,
        );
      }
      setReady(true);
    });

    // ── Development marker (large, accent) ──────────────────────
    const devEl = document.createElement('div');
    devEl.className = 'ahc-marker ahc-marker--home';
    new maplibregl.Marker({ element: devEl, anchor: 'bottom' })
      .setLngLat(DEVELOPMENT.coords)
      .setPopup(new maplibregl.Popup({ offset: 28, closeButton: false }).setHTML(
        `<strong>${DEVELOPMENT.name}</strong>`,
      ))
      .addTo(map);

    // ── POI markers ─────────────────────────────────────────────
    markersRef.current = locations.map((loc, i) => {
      const el = document.createElement('div');
      el.className = 'ahc-marker ahc-marker--poi';
      el.addEventListener('click', () => flyTo(i));
      return new maplibregl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat(loc.coords)
        .setPopup(new maplibregl.Popup({ offset: 22, closeButton: false }).setHTML(
          `<strong>${loc.name}</strong><span>${loc.time}</span>`,
        ))
        .addTo(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flyTo = (index) => {
    const map = mapRef.current;
    if (!map) return;
    setActiveIndex(index);
    markersRef.current[index]?.togglePopup();
    map.flyTo({
      center: locations[index].coords,
      zoom: 16.5,
      pitch: 62,
      bearing: -18,
      duration: 2200,
      essential: true,
    });
  };

  const resetView = () => {
    setActiveIndex(null);
    mapRef.current?.flyTo({
      center: DEVELOPMENT.coords,
      zoom: 14.5,
      pitch: 58,
      bearing: -18,
      duration: 2000,
      essential: true,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 md:gap-10 items-start">

      {/* Map — 3/5 */}
      <div className="lg:col-span-3 relative overflow-hidden border border-border" style={{ borderRadius: '2px' }}>
        <div ref={containerRef} className="w-full h-[320px] md:h-[480px]" />
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-alt">
            <span className="text-text-muted text-sm font-light">Učitavanje mape…</span>
          </div>
        )}
      </div>

      {/* Distance list — 2/5 */}
      <div className="lg:col-span-2 flex flex-col gap-0">
        {locations.map((loc, i) => (
          <button
            key={i}
            type="button"
            onClick={() => flyTo(i)}
            className={[
              'flex items-center justify-between py-3.5 border-b border-border text-left',
              'transition-all duration-150 hover:pl-2',
              activeIndex === i ? 'pl-2 bg-accent/5' : '',
            ].join(' ')}
            style={{ borderBottom: i === locations.length - 1 ? '1px solid var(--color-border)' : undefined }}
          >
            <div className="flex items-center gap-3">
              <LuMapPin className={['w-3.5 h-3.5 flex-shrink-0 transition-colors', activeIndex === i ? 'text-accent' : 'text-accent/70'].join(' ')} />
              <span className="text-text font-light" style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>
                {loc.name}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-accent">
              <LuClock className="w-3 h-3 opacity-60" />
              <span className="font-medium" style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem' }}>
                {loc.time}
              </span>
            </div>
          </button>
        ))}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-text-muted font-light leading-relaxed">
            * Procenjeno vreme vožnje u normalnom saobraćaju
          </p>
          <button
            type="button"
            onClick={resetView}
            className="text-xs text-accent font-medium hover:underline flex-shrink-0 ml-4"
          >
            Resetuj prikaz
          </button>
        </div>
      </div>

    </div>
  );
};
