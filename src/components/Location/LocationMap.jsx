'use client';
import { useEffect, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  LuMapPin,
  LuClock,
  LuRoute,
  LuShoppingCart,
  LuGraduationCap,
  LuStethoscope,
  LuBuilding2,
  LuBusFront,
} from 'react-icons/lu';

// Free, no-token vector tiles (OpenFreeMap) — "liberty" is the colorful basemap
// (blue water, green parks, colored roads); includes building data for 3D.
const STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

/**
 * ⚠️ APPROXIMATE COORDINATES — replace with real values.
 * Order is [longitude, latitude]. The DEVELOPMENT pin is the anchor; the
 * camera opens here and "Resetuj prikaz" returns to it.
 */
const DEVELOPMENT = { name: 'Avala Home Concept', coords: [20.516, 44.692] };

const locations = [
  { name: 'Autoput',        time: '10 min', icon: LuRoute,         coords: [20.5050, 44.7100] },
  { name: 'Ikea',           time: '10 min', label: 'IKEA',         coords: [20.5093, 44.7236] },
  { name: 'Marketi',        time: '2 min',  icon: LuShoppingCart,  coords: [20.5145, 44.6945] },
  { name: 'TC Ava',         time: '10 min', label: 'Ava',          coords: [20.5130, 44.7270] },
  { name: 'Škola',          time: '5 min',  icon: LuGraduationCap, coords: [20.5120, 44.6975] },
  { name: 'Autokomanda',    time: '20 min', icon: LuBusFront,      coords: [20.4760, 44.7866] },
  { name: 'Vračar',         time: '20 min', icon: LuBuilding2,     coords: [20.4690, 44.7980] },
  { name: 'Ambulanta',      time: '5 min',  icon: LuStethoscope,   coords: [20.5180, 44.6960] },
  { name: 'Gradski prevoz', time: '2 min',  icon: LuBusFront,      coords: [20.5150, 44.6930] },
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
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-left');
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-left');
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
              // Neutral tones that blend with the basemap, with subtle height shading.
              'fill-extrusion-color': [
                'interpolate',
                ['linear'],
                ['coalesce', ['get', 'render_height'], 6],
                0, '#E8E2D6',
                28, '#D2CABB',
                60, '#BCB2A0',
              ],
              'fill-extrusion-height': ['coalesce', ['get', 'render_height'], 6],
              'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], 0],
              'fill-extrusion-opacity': 0.92,
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
      if (loc.label) {
        // Wordmark badge for named places (e.g. IKEA, Ava)
        el.className = 'ahc-poi ahc-poi--label';
        el.textContent = loc.label;
      } else {
        // Descriptive category icon
        el.className = 'ahc-poi';
        el.innerHTML = renderToStaticMarkup(<loc.icon size={15} strokeWidth={2.25} />);
      }
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
    <div className="relative w-full overflow-hidden border border-border" style={{ borderRadius: '2px' }}>

      {/* Map — full width */}
      <div ref={containerRef} className="w-full h-[440px] md:h-[600px]" />
      {!ready && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-bg-alt">
          <span className="text-text-muted text-sm font-light">Učitavanje mape…</span>
        </div>
      )}

      {/* Glassy ivory selection panel overlaid on the map */}
      <div
        className="absolute z-10 flex flex-col inset-x-3 bottom-3 max-h-[42%] md:inset-x-auto md:right-4 md:top-4 md:bottom-4 md:w-[340px] md:max-h-none rounded-[4px] border border-white/70 shadow-[0_8px_30px_rgba(26,25,21,0.18)] overflow-hidden"
        style={{
          backgroundColor: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex-1 overflow-y-auto px-4">
          {locations.map((loc, i) => (
            <button
              key={i}
              type="button"
              onClick={() => flyTo(i)}
              className={[
                'w-full flex items-center justify-between py-3 border-b border-[rgba(26,25,21,0.08)] text-left',
                'transition-all duration-150 hover:pl-1.5',
                activeIndex === i ? 'pl-1.5' : '',
                i === locations.length - 1 ? 'border-b-0' : '',
              ].join(' ')}
            >
              <div className="flex items-center gap-3">
                <LuMapPin className={['w-3.5 h-3.5 flex-shrink-0 transition-colors', activeIndex === i ? 'text-accent-strong' : 'text-accent-strong/70'].join(' ')} />
                <span className="text-text" style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: activeIndex === i ? 600 : 300 }}>
                  {loc.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-accent-strong">
                <LuClock className="w-3 h-3 opacity-60" />
                <span className="font-medium" style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem' }}>
                  {loc.time}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div
          className="flex items-center justify-between gap-3 px-4 py-3 border-t border-white/70"
          style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
        >
          <p className="text-[0.7rem] text-text-muted font-light leading-snug">
            * Procenjeno vreme vožnje u normalnom saobraćaju
          </p>
          <button
            type="button"
            onClick={resetView}
            className="text-xs text-accent-strong font-medium hover:underline flex-shrink-0"
          >
            Resetuj prikaz
          </button>
        </div>
      </div>

    </div>
  );
};
