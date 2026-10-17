'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import { Bounce, toast } from 'react-toastify';
import { LuCalendarCheck, LuX } from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';

const DAYS_AHEAD = 14;
const SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
const INTL_LOCALE = { sr: 'sr-Latn-RS', en: 'en-GB', ru: 'ru-RU', de: 'de-DE' };

// Working days for visits: Monday–Saturday, starting tomorrow (matches the
// office hours in contact.availability).
const upcomingDays = () => {
  const days = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (days.length < DAYS_AHEAD) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) days.push(new Date(d));
  }
  return days;
};

const labelCls =
  'text-text-muted text-[0.68rem] font-medium tracking-[0.15em] uppercase mb-2 block';
const chipCls = (on) =>
  `border px-3 py-2 text-sm transition-colors duration-150 ${
    on ? 'border-accent bg-accent text-white' : 'border-border text-text hover:border-accent'
  }`;

// "Zakažite obilazak": a button that opens a day + time picker. The request is
// stored as a regular inquiry (shows up in /admin/inquiries) and emailed through
// the same EmailJS template as the contact form.
export const TourBookingButton = ({ className = 'btn-ghost group', children }) => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children ?? (
          <>
            <LuCalendarCheck className="w-4 h-4" />
            {t('tour.button')}
          </>
        )}
      </button>
      {/* Portaled: the button can sit inside another <form> (the contact form). */}
      {open && createPortal(<TourBookingDialog onClose={() => setOpen(false)} />, document.body)}
    </>
  );
};

const TourBookingDialog = ({ onClose }) => {
  const { t, locale, href } = useI18n();
  const router = useRouter();
  const startedAt = useRef(Date.now());
  const days = useMemo(upcomingDays, []);
  const [day, setDay] = useState(null);
  const [slot, setSlot] = useState(null);
  const [sending, setSending] = useState(false);

  const fmtChip = new Intl.DateTimeFormat(INTL_LOCALE[locale] ?? 'sr-Latn-RS', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  // The team reads every request in Serbian, whatever the site language.
  const fmtAdmin = new Intl.DateTimeFormat('sr-Latn-RS', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const toastError = (key) =>
    toast.error(t(key), { position: 'bottom-center', autoClose: 5000, theme: 'light', transition: Bounce });

  const submit = async (e) => {
    e.preventDefault();
    if (sending) return;
    if (day === null || !slot) {
      toastError('tour.pickSlot');
      return;
    }
    setSending(true);
    const fd = new FormData(e.currentTarget);
    const name = fd.get('name');
    const phone = fd.get('phone');
    const note = String(fd.get('note') || '').trim();
    const message =
      `ZAKAZIVANJE OBILASKA: ${fmtAdmin.format(days[day])} u ${slot}` +
      (note ? `\n\nNapomena: ${note}` : '');

    let saved = null;
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          message,
          website: fd.get('website'),
          elapsedMs: Date.now() - startedAt.current,
          locale,
          page: window.location.pathname,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (json.spam) {
        router.push(href('/thank-you'));
        return;
      }
      if (res.status === 429) {
        toastError('contact.spamToast');
        setSending(false);
        return;
      }
      if (res.ok && json.ok) saved = json.id;
    } catch {
      // API unreachable — still try the email.
    }

    try {
      await emailjs.send(
        'service_479xn4w',
        'template_f65leyq',
        { firstName: name, contactNumber: phone, contactEmail: '', message },
        'yXqwmaxm-PpofwIqK',
      );
      if (saved) {
        fetch('/api/inquiry', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: saved }),
          keepalive: true,
        }).catch(() => {});
      }
      router.push(href('/thank-you'));
    } catch {
      if (saved) {
        router.push(href('/thank-you'));
      } else {
        toastError('contact.errorToast');
        setSending(false);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-bg-dark/80 md:p-6"
      style={{ animation: 'fade-up 0.25s ease both' }}
      onClick={onClose}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-title"
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative w-full md:max-w-lg max-h-[92svh] overflow-y-auto bg-bg p-5 md:p-8 flex flex-col gap-6 text-left"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t('tour.close')}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center text-text-muted hover:text-accent"
        >
          <LuX className="h-5 w-5" />
        </button>

        <div className="pr-8">
          <span className="overline"><LuCalendarCheck />{t('tour.eyebrow')}</span>
          <h3
            id="tour-title"
            className="text-text"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '1.7rem', fontWeight: 400 }}
          >
            {t('tour.title')}
          </h3>
          <p className="text-text-muted text-sm font-light leading-relaxed mt-2">{t('tour.subtitle')}</p>
        </div>

        {/* Honeypot, same as the contact form. */}
        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>

        <fieldset>
          <legend className={labelCls} style={{ fontFamily: 'var(--font-body)' }}>{t('tour.date')}</legend>
          <div className="flex flex-wrap gap-2">
            {days.map((d, i) => (
              <button
                key={i}
                type="button"
                aria-pressed={day === i}
                onClick={() => setDay(i)}
                className={`${chipCls(day === i)} capitalize`}
              >
                {fmtChip.format(d)}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className={labelCls} style={{ fontFamily: 'var(--font-body)' }}>{t('tour.time')}</legend>
          <div className="flex flex-wrap gap-2">
            {SLOTS.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={slot === s}
                onClick={() => setSlot(s)}
                className={`${chipCls(slot === s)} tabular-nums`}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-4">
          <input name="name" required maxLength={120} placeholder={t('tour.name')} className="input" autoComplete="name" />
          <input name="phone" type="tel" required maxLength={40} placeholder={t('tour.phone')} className="input" autoComplete="tel" />
          <textarea name="note" rows={2} maxLength={1000} placeholder={t('tour.note')} className="input resize-none" />
        </div>

        <button
          type="submit"
          disabled={sending}
          aria-busy={sending}
          className="btn-primary justify-center disabled:opacity-60 disabled:cursor-wait"
        >
          <LuCalendarCheck className="w-4 h-4" />
          {t('tour.submit')}
        </button>
      </form>
    </div>
  );
};
