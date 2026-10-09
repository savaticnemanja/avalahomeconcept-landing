'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LuZoomIn, LuZoomOut } from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';

const MAX_SCALE = 4;
const STEP_SCALE = 2;
const DOUBLE_TAP_MS = 300;
const RESET = { scale: 1, x: 0, y: 0 };

const clampNum = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// Fullscreen image viewer for project photos. Swipe/drag or arrows change the
// slide; pinch, wheel, double-tap/double-click or the +/- buttons zoom, and a
// zoomed image is panned by dragging. Zoom resets whenever the slide changes.
export const ZoomViewer = ({ images, index, onClose, onSetIndex }) => {
  const { t } = useI18n();
  const [dragX, setDragX] = useState(0);
  const [view, setViewState] = useState(RESET);
  const [gesturing, setGesturing] = useState(false);
  const viewRef = useRef(RESET);
  const indexRef = useRef(index);
  const rootRef = useRef(null);
  const imgRefs = useRef([]);
  const pointers = useRef(new Map());
  const gesture = useRef(null);
  const movedRef = useRef(false);
  const downOnImageRef = useRef(false);
  const lastTap = useRef({ time: 0, x: 0, y: 0 });

  indexRef.current = index;

  const setView = useCallback((v) => {
    viewRef.current = v;
    setViewState(v);
  }, []);

  const clamp = useCallback((i) => Math.max(0, Math.min(images.length - 1, i)), [images.length]);
  const prev = useCallback(() => onSetIndex((i) => clamp(i - 1)), [onSetIndex, clamp]);
  const next = useCallback(() => onSetIndex((i) => clamp(i + 1)), [onSetIndex, clamp]);

  // Point relative to the viewer centre (the image is centred there at scale 1).
  const rel = (clientX, clientY) => {
    const r = rootRef.current?.getBoundingClientRect();
    if (!r) return { x: 0, y: 0 };
    return { x: clientX - (r.left + r.width / 2), y: clientY - (r.top + r.height / 2) };
  };

  // Keep the zoomed image covering the viewport edge it is panned towards.
  const applyView = useCallback((scale, x, y) => {
    if (scale <= 1.01) {
      setView(RESET);
      return;
    }
    const img = imgRefs.current[indexRef.current];
    const root = rootRef.current;
    const maxX = img && root ? Math.max(0, (img.offsetWidth * scale - root.clientWidth) / 2) : 0;
    const maxY = img && root ? Math.max(0, (img.offsetHeight * scale - root.clientHeight) / 2) : 0;
    setView({ scale, x: clampNum(x, -maxX, maxX), y: clampNum(y, -maxY, maxY) });
  }, [setView]);

  // Zoom so the image point under p (relative to centre) stays under p.
  const zoomAt = useCallback((scale, p = { x: 0, y: 0 }) => {
    const v = viewRef.current;
    const s = clampNum(scale, 1, MAX_SCALE);
    applyView(s, p.x - ((p.x - v.x) * s) / v.scale, p.y - ((p.y - v.y) * s) / v.scale);
  }, [applyView]);

  useEffect(() => {
    setView(RESET);
    setDragX(0);
  }, [index, setView]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === '+' || e.key === '=') zoomAt(viewRef.current.scale * STEP_SCALE);
      if (e.key === '-') zoomAt(viewRef.current.scale / STEP_SCALE);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, prev, next, zoomAt]);

  // Wheel / trackpad pinch zoom. Attached natively because React's wheel
  // listener is passive and can't stop the page from scrolling.
  const open = index !== null;
  useEffect(() => {
    const root = rootRef.current;
    if (!open || !root) return undefined;
    const onWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaMode === 1 ? e.deltaY * 33 : e.deltaY;
      const k = e.ctrlKey ? 0.01 : 0.0015;
      zoomAt(viewRef.current.scale * Math.exp(-delta * k), rel(e.clientX, e.clientY));
    };
    root.addEventListener('wheel', onWheel, { passive: false });
    return () => root.removeEventListener('wheel', onWheel);
  }, [open, zoomAt]);

  if (index === null) return null;

  const startPan = (x, y) => {
    gesture.current = {
      type: 'pan',
      x0: x,
      y0: y,
      view: viewRef.current,
      width: rootRef.current?.clientWidth || window.innerWidth,
    };
  };
  const startPinch = () => {
    const [a, b] = [...pointers.current.values()];
    gesture.current = {
      type: 'pinch',
      dist0: Math.hypot(a.x - b.x, a.y - b.y) || 1,
      mid0: rel((a.x + b.x) / 2, (a.y + b.y) / 2),
      view: viewRef.current,
    };
    setDragX(0);
  };

  const onDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setGesturing(true);
    if (pointers.current.size === 1) {
      movedRef.current = false;
      downOnImageRef.current = e.target.tagName === 'IMG';
      startPan(e.clientX, e.clientY);
    } else if (pointers.current.size === 2) {
      movedRef.current = true;
      startPinch();
    }
  };

  const onMove = (e) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    if (!g) return;
    if (g.type === 'pinch' && pointers.current.size >= 2) {
      const [a, b] = [...pointers.current.values()];
      const s = clampNum((g.view.scale * Math.hypot(a.x - b.x, a.y - b.y)) / g.dist0, 1, MAX_SCALE);
      const mid = rel((a.x + b.x) / 2, (a.y + b.y) / 2);
      applyView(
        s,
        mid.x - ((g.mid0.x - g.view.x) * s) / g.view.scale,
        mid.y - ((g.mid0.y - g.view.y) * s) / g.view.scale
      );
    } else if (g.type === 'pan') {
      const dx = e.clientX - g.x0;
      const dy = e.clientY - g.y0;
      if (Math.hypot(dx, dy) > 5) movedRef.current = true;
      if (g.view.scale > 1) applyView(g.view.scale, g.view.x + dx, g.view.y + dy);
      else setDragX(dx);
    }
  };

  const onUp = (e) => {
    if (!pointers.current.has(e.pointerId)) return;
    if (e.type === 'pointercancel') movedRef.current = true;
    pointers.current.delete(e.pointerId);
    const g = gesture.current;

    // Lifting one finger of a pinch hands over to panning with the other.
    if (pointers.current.size === 1) {
      const [p] = [...pointers.current.values()];
      startPan(p.x, p.y);
      return;
    }
    if (pointers.current.size > 1) {
      startPinch();
      return;
    }

    gesture.current = null;
    setGesturing(false);
    setDragX(0);

    if (g?.type === 'pan' && g.view.scale === 1 && movedRef.current) {
      const dx = e.clientX - g.x0;
      if (Math.abs(dx) > g.width * 0.15) {
        if (dx < 0) next(); else prev();
      }
      return;
    }

    // Double tap / double click on the image toggles zoom at that point.
    if (!movedRef.current && downOnImageRef.current) {
      const last = lastTap.current;
      if (
        e.timeStamp - last.time < DOUBLE_TAP_MS &&
        Math.hypot(e.clientX - last.x, e.clientY - last.y) < 30
      ) {
        lastTap.current = { time: 0, x: 0, y: 0 };
        if (viewRef.current.scale > 1) setView(RESET);
        else zoomAt(STEP_SCALE * 1.25, rel(e.clientX, e.clientY));
      } else {
        lastTap.current = { time: e.timeStamp, x: e.clientX, y: e.clientY };
      }
    }
  };

  const zoomed = view.scale > 1;
  const multiple = images.length > 1;

  return (
    <div
      ref={rootRef}
      data-lenis-prevent
      className="fixed inset-0 z-[80] bg-bg-dark/95 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label={images[index]?.alt}
      onClick={() => {
        if (movedRef.current || downOnImageRef.current) return;
        onClose();
      }}
    >
      <div
        className="absolute inset-0 flex"
        style={{
          transform: `translateX(calc(${-index * 100}% + ${dragX}px))`,
          transition: gesturing ? 'none' : 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
          touchAction: 'none',
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {images.map((im, i) => {
          const active = i === index;
          return (
            <div key={i} className="w-full flex-shrink-0 flex items-center justify-center px-4 select-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={(el) => { imgRefs.current[i] = el; }}
                src={im.src}
                alt={im.alt}
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-[4px]"
                draggable={false}
                style={{
                  transform: active && zoomed
                    ? `translate(${view.x}px, ${view.y}px) scale(${view.scale})`
                    : undefined,
                  transition: gesturing ? 'none' : 'transform 0.25s ease-out',
                  cursor: active && zoomed ? (gesturing ? 'grabbing' : 'grab') : 'zoom-in',
                }}
              />
            </div>
          );
        })}
      </div>

      <button
        className="absolute top-4 right-4 z-10 text-text-light text-3xl leading-none hover:text-accent transition-colors"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label={t('common.close')}
      >
        &#x2715;
      </button>
      {multiple && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-text-light text-5xl leading-none hover:text-accent transition-colors p-2 disabled:opacity-30"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            disabled={index === 0}
            aria-label={t('common.prev')}
          >
            &#8249;
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-text-light text-5xl leading-none hover:text-accent transition-colors p-2 disabled:opacity-30"
            onClick={(e) => { e.stopPropagation(); next(); }}
            disabled={index === images.length - 1}
            aria-label={t('common.next')}
          >
            &#8250;
          </button>
        </>
      )}

      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 rounded-full bg-black/40 backdrop-blur-sm px-1.5 py-1"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="p-2 text-text-light hover:text-accent transition-colors disabled:opacity-30 disabled:hover:text-text-light"
          onClick={() => zoomAt(view.scale / STEP_SCALE)}
          disabled={!zoomed}
          aria-label={t('common.zoomOut')}
        >
          <LuZoomOut className="w-5 h-5" />
        </button>
        {multiple && (
          <span className="px-1 text-xs text-text-light/80 tabular-nums" style={{ fontFamily: 'var(--font-body)' }}>
            {index + 1} / {images.length}
          </span>
        )}
        <button
          className="p-2 text-text-light hover:text-accent transition-colors disabled:opacity-30 disabled:hover:text-text-light"
          onClick={() => zoomAt(view.scale * STEP_SCALE)}
          disabled={view.scale >= MAX_SCALE}
          aria-label={t('common.zoomIn')}
        >
          <LuZoomIn className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
