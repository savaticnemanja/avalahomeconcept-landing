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

// Satellite (Esri World Imagery) + place/road labels overlay — a "hybrid" basemap.
const SATELLITE_STYLE = {
  version: 8,
  sources: {
    satellite: {
      type: 'raster',
      tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
      tileSize: 256,
      maxzoom: 19,
      attribution: 'Imagery © Esri, Maxar, Earthstar Geographics',
    },
    reference: {
      type: 'raster',
      tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'],
      tileSize: 256,
      maxzoom: 19,
    },
  },
  layers: [
    { id: 'satellite', type: 'raster', source: 'satellite' },
    { id: 'reference', type: 'raster', source: 'reference' },
  ],
};

const DEVELOPMENT = { name: 'Avala Home Concept', coords: [20.5462693, 44.6486367] };

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

// ─── Project phases ────────────────────────────────────────────────
// Corners are [lng, lat] in clockwise order. Use the ?edit panel below
// the map to drag these into place, then Copy and paste the result here.
const PHASES = [
  {
    id: 'faza1',
    name: 'Faza 1',
    status: 'sold',
    polygon: [
      [20.545362, 44.647948],
      [20.546874, 44.647410],
      [20.546615, 44.647042],
      [20.545103, 44.647579],
    ],
  },
  {
    id: 'faza2',
    name: 'Faza 2',
    status: 'sold',
    polygon: [
      [20.545741, 44.648473],
      [20.547082, 44.647990],
      [20.546719, 44.647480],
      [20.545378, 44.647963],
    ],
  },
  {
    id: 'faza3',
    name: 'Faza 3',
    status: 'available',
    polygon: [
      [20.547661, 44.648302],
      [20.548844, 44.647980],
      [20.548514, 44.647394],
      [20.547454, 44.647792],
    ],
  },
];

const PHASE_COLORS = { sold: '#e03131', available: '#2f9e44' };
const PHASE_STATUS_LABEL = { sold: 'Prodato', available: 'U prodaji' };

const centroid = (poly) => {
  const [sx, sy] = poly.reduce(([ax, ay], [x, y]) => [ax + x, ay + y], [0, 0]);
  return [sx / poly.length, sy / poly.length];
};

const phaseColorExpr = [
  'match', ['get', 'status'],
  'sold', PHASE_COLORS.sold,
  'available', PHASE_COLORS.available,
  '#888888',
];

// Frame all three phases on load.
const INITIAL_CENTER = [20.5470, 44.6471];
const INITIAL_ZOOM = 16.3;

// ─── Editor transform (move / scale / rotate around centroid) ───────
const IDENTITY = { east: 0, north: 0, scaleL: 1, scaleH: 1, rot: 0 };

// Apply a metric transform to a [lng, lat] polygon and return [lng, lat] corners.
// scaleL/scaleH scale along the shape's own length/height axes (the first edge
// defines the length axis), so rotated rectangles stay rectangles.
const transformPolygon = (base, t = IDENTITY) => {
  const [clng, clat] = centroid(base);
  const mLat = 111320;
  const mLng = 111320 * Math.cos((clat * Math.PI) / 180);

  // Local axes from the first edge (length axis) and its perpendicular (height).
  const e0x = (base[1][0] - base[0][0]) * mLng;
  const e0y = (base[1][1] - base[0][1]) * mLat;
  const baseAng = Math.atan2(e0y, e0x);
  const ux = Math.cos(baseAng);
  const uy = Math.sin(baseAng);
  const vx = -Math.sin(baseAng);
  const vy = Math.cos(baseAng);

  const sL = t.scaleL ?? 1;
  const sH = t.scaleH ?? 1;
  const a = ((t.rot || 0) * Math.PI) / 180;
  const cos = Math.cos(a);
  const sin = Math.sin(a);

  return base.map(([x, y]) => {
    const ex = (x - clng) * mLng;
    const ny = (y - clat) * mLat;
    // Scale along local axes.
    const pl = (ex * ux + ny * uy) * sL;
    const ph = (ex * vx + ny * vy) * sH;
    const mx = pl * ux + ph * vx;
    const my = pl * uy + ph * vy;
    // User rotation + translation.
    const rx = mx * cos - my * sin;
    const ry = mx * sin + my * cos;
    return [
      clng + ((t.east || 0) + rx) / mLng,
      clat + ((t.north || 0) + ry) / mLat,
    ];
  });
};

const buildPhaseData = (transforms) => ({
  type: 'FeatureCollection',
  features: PHASES.map((p) => {
    const poly = transformPolygon(p.polygon, transforms[p.id]);
    return {
      type: 'Feature',
      properties: { id: p.id, status: p.status },
      geometry: { type: 'Polygon', coordinates: [[...poly, poly[0]]] },
    };
  }),
});

const initialTransforms = () =>
  Object.fromEntries(PHASES.map((p) => [p.id, { ...IDENTITY }]));

const exportSnippet = (transforms) => {
  const body = PHASES.map((p) => {
    const poly = transformPolygon(p.polygon, transforms[p.id]);
    const corners = poly
      .map(([x, y]) => `      [${x.toFixed(6)}, ${y.toFixed(6)}],`)
      .join('\n');
    return [
      '  {',
      `    id: '${p.id}',`,
      `    name: '${p.name}',`,
      `    status: '${p.status}',`,
      '    polygon: [',
      corners,
      '    ],',
      '  },',
    ].join('\n');
  }).join('\n');
  return `const PHASES = [\n${body}\n];`;
};

export const LocationMap = () => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const phaseMarkersRef = useRef({});
  const [activeIndex, setActiveIndex] = useState(null);
  const [ready, setReady] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [transforms, setTransforms] = useState(initialTransforms);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const q = window.location.search + window.location.hash;
    setEditMode(q.includes('edit'));
  }, []);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: SATELLITE_STYLE,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: false }), 'top-left');
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-left');
    map.scrollZoom.disable();

    map.on('load', () => {
      map.addSource('phases', { type: 'geojson', data: buildPhaseData(initialTransforms()) });
      map.addLayer({
        id: 'phases-fill',
        type: 'fill',
        source: 'phases',
        paint: { 'fill-color': phaseColorExpr, 'fill-opacity': 0.28 },
      });
      map.addLayer({
        id: 'phases-outline',
        type: 'line',
        source: 'phases',
        paint: { 'line-color': phaseColorExpr, 'line-width': 2.5 },
      });
      setReady(true);
    });

    // Phase labels (DOM markers at each polygon centroid).
    PHASES.forEach((p) => {
      const el = document.createElement('div');
      el.className = 'ahc-phase-label';
      el.style.setProperty('--phase-color', PHASE_COLORS[p.status]);
      el.innerHTML = `<strong>${p.name}</strong><span>${PHASE_STATUS_LABEL[p.status]}</span>`;
      el.addEventListener('click', () => flyToPhase(p));
      const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat(centroid(p.polygon))
        .addTo(map);
      phaseMarkersRef.current[p.id] = marker;
    });

    const devEl = document.createElement('div');
    devEl.className = 'ahc-marker ahc-marker--home';
    new maplibregl.Marker({ element: devEl, anchor: 'bottom' })
      .setLngLat(DEVELOPMENT.coords)
      .setPopup(new maplibregl.Popup({ offset: 28, closeButton: false }).setHTML(
        `<strong>${DEVELOPMENT.name}</strong>`,
      ))
      .addTo(map);

    markersRef.current = locations.map((loc, i) => {
      const el = document.createElement('div');
      if (loc.label) {
        el.className = 'ahc-poi ahc-poi--label';
        el.textContent = loc.label;
      } else {
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
      phaseMarkersRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-render phase polygons + labels whenever the editor transforms change.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    map.getSource('phases')?.setData(buildPhaseData(transforms));
    PHASES.forEach((p) => {
      const poly = transformPolygon(p.polygon, transforms[p.id]);
      phaseMarkersRef.current[p.id]?.setLngLat(centroid(poly));
    });
  }, [transforms, ready]);

  const flyTo = (index) => {
    const map = mapRef.current;
    if (!map) return;
    setActiveIndex(index);
    markersRef.current[index]?.togglePopup();
    map.flyTo({
      center: locations[index].coords,
      zoom: 16.5,
      pitch: 0,
      bearing: 0,
      duration: 2200,
      essential: true,
    });
  };

  const flyToPhase = (phase) => {
    setActiveIndex(null);
    const marker = phaseMarkersRef.current[phase.id];
    const center = marker ? marker.getLngLat() : centroid(phase.polygon);
    mapRef.current?.flyTo({
      center,
      zoom: 17.4,
      pitch: 0,
      bearing: 0,
      duration: 2000,
      essential: true,
    });
  };

  const resetView = () => {
    setActiveIndex(null);
    mapRef.current?.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      pitch: 0,
      bearing: 0,
      duration: 2000,
      essential: true,
    });
  };

  const setT = (id, field, value) =>
    setTransforms((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));

  const copyPhases = async () => {
    const text = exportSnippet(transforms);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // clipboard blocked — the textarea below still lets the user copy manually
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const slider = (id, field, label, min, max, step, unit, digits = 0) => (
    <label className="flex items-center gap-2 text-[0.72rem]">
      <span className="w-12 text-text-muted">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={transforms[id][field]}
        onChange={(e) => setT(id, field, parseFloat(e.target.value))}
        className="flex-1 accent-accent"
      />
      <span className="w-14 text-right tabular-nums text-text">
        {transforms[id][field].toFixed(digits)}{unit}
      </span>
    </label>
  );

  return (
    <>
      <div className="relative w-full overflow-hidden border border-border" style={{ borderRadius: '2px' }}>

        <div ref={containerRef} className="w-full h-[440px] md:h-[600px]" />
        {!ready && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-bg-alt">
            <span className="text-text-muted text-sm font-light">Učitavanje mape…</span>
          </div>
        )}

        <div
          className="absolute z-10 flex flex-col inset-x-3 bottom-3 max-h-[42%] md:inset-x-auto md:right-4 md:top-4 md:bottom-4 md:w-[340px] md:max-h-none rounded-[4px] border border-white/70 shadow-[0_8px_30px_rgba(26,25,21,0.18)] overflow-hidden"
          style={{
            backgroundColor: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex-1 overflow-y-auto px-4">
            <p className="pt-3 pb-1 text-[0.7rem] uppercase tracking-[0.08em] text-text-muted font-medium">
              Faze projekta
            </p>
            {PHASES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => flyToPhase(p)}
                className="w-full flex items-center justify-between py-2.5 border-b border-[rgba(26,25,21,0.08)] text-left transition-all duration-150 hover:pl-1.5"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 flex-shrink-0 rounded-[2px]"
                    style={{ backgroundColor: PHASE_COLORS[p.status], opacity: 0.85 }}
                  />
                  <span className="text-text" style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 400 }}>
                    {p.name}
                  </span>
                </div>
                <span
                  className="font-medium"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: PHASE_COLORS[p.status] }}
                >
                  {PHASE_STATUS_LABEL[p.status]}
                </span>
              </button>
            ))}

            <p className="pt-4 pb-1 text-[0.7rem] uppercase tracking-[0.08em] text-text-muted font-medium">
              U okolini
            </p>
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
                  <LuMapPin className={['w-3.5 h-3.5 flex-shrink-0 transition-colors', activeIndex === i ? 'text-accent' : 'text-accent/70'].join(' ')} />
                  <span className="text-text" style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: activeIndex === i ? 600 : 300 }}>
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
              className="text-xs text-accent font-medium hover:underline flex-shrink-0"
            >
              Resetuj prikaz
            </button>
          </div>
        </div>

      </div>

      {editMode && (
        <div className="mt-3 rounded-[4px] border border-border bg-bg-alt p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-[0.08em] text-text-muted font-semibold">
              Phase editor (dev — visible only with ?edit)
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setTransforms(initialTransforms())}
                className="text-xs text-text-muted hover:text-text underline"
              >
                Reset all
              </button>
              <button
                type="button"
                onClick={copyPhases}
                className="text-xs font-semibold px-3 py-1.5 rounded-[3px] bg-accent text-white hover:opacity-90"
              >
                {copied ? 'Copied ✓' : 'Copy PHASES'}
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {PHASES.map((p) => (
              <div key={p.id} className="rounded-[3px] border border-border/60 bg-white/60 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: PHASE_COLORS[p.status] }} />
                  <span className="text-sm font-medium text-text">{p.name}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {slider(p.id, 'east', 'East', -250, 250, 1, ' m')}
                  {slider(p.id, 'north', 'North', -250, 250, 1, ' m')}
                  {slider(p.id, 'scaleL', 'Length', 0.3, 2, 0.01, '×', 2)}
                  {slider(p.id, 'scaleH', 'Height', 0.3, 2, 0.01, '×', 2)}
                  {slider(p.id, 'rot', 'Rotate', -180, 180, 1, '°')}
                </div>
              </div>
            ))}
          </div>

          <textarea
            readOnly
            value={exportSnippet(transforms)}
            onFocus={(e) => e.target.select()}
            className="mt-3 w-full h-40 text-[0.7rem] font-mono leading-snug p-2 rounded-[3px] border border-border bg-white text-text"
          />
        </div>
      )}
    </>
  );
};
