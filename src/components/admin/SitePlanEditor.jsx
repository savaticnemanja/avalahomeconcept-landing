'use client';

import { useState } from 'react';
import sitePlanImage from '@/assets/gallery/complex-aerial.webp';

const labelClass = 'text-xs font-medium uppercase tracking-wide text-text-muted';

const numOf = (v, fallback) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : fallback;
};

// Edits the pin position on the offer-page site plan via sliders, with a live
// preview. Submits sitePlanTop/sitePlanLeft as "NN%" strings (or empty to hide
// the pin) inside the surrounding project form.
export const SitePlanEditor = ({ top, left, order = 0 }) => {
  const [enabled, setEnabled] = useState(Boolean(top && left));
  const [t, setT] = useState(numOf(top, 50));
  const [l, setL] = useState(numOf(left, 50));

  return (
    <div className="flex flex-col gap-3">
      <input type="hidden" name="sitePlanTop" value={enabled ? `${t}%` : ''} />
      <input type="hidden" name="sitePlanLeft" value={enabled ? `${l}%` : ''} />

      <label className="flex items-center gap-2 text-sm text-text select-none">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="accent-accent w-4 h-4"
        />
        Prikaži na planu lokacije
      </label>

      {enabled && (
        <>
          <div className="relative rounded-[4px] overflow-hidden border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={sitePlanImage.src} alt="" className="w-full h-auto block select-none" draggable={false} />
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-accent text-white text-[0.65rem] font-semibold border-2 border-white shadow-[0_3px_10px_rgba(26,25,21,0.45)]"
              style={{ top: `${t}%`, left: `${l}%` }}
            >
              {order + 1}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <span className={labelClass}>Gore — {t}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={t}
                onChange={(e) => setT(Number(e.target.value))}
                className="w-full accent-accent"
                aria-label="Pozicija pina — gore"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className={labelClass}>Levo — {l}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={l}
                onChange={(e) => setL(Number(e.target.value))}
                className="w-full accent-accent"
                aria-label="Pozicija pina — levo"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
