import { prisma } from '@/lib/db';

export const runtime = 'nodejs';

// Bots fill every field (incl. the hidden `website` honeypot) and submit
// instantly; humans need a few seconds to type a name, phone and message.
const MIN_FILL_MS = 3000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5; // inquiries per IP per window
const LIMITS = { name: 120, phone: 40, email: 200, message: 5000, locale: 5, page: 200 };

// In-memory is enough: a single app container serves the site.
const hits = new Map();
const rateLimited = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_MAX;
};

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Honeypot filled: almost certainly a bot. Answer as if it worked so it
  // doesn't retry, but don't store it or let the client send the email.
  if (str(body.website, 200)) {
    return Response.json({ ok: true, spam: true });
  }
  // Too fast to be typed. Not silent: a person using autofill gets a
  // "wait a few seconds and retry" message instead of a lost inquiry.
  if (!(Number(body.elapsedMs) >= MIN_FILL_MS)) {
    return Response.json({ ok: false, error: 'too_fast' }, { status: 429 });
  }

  const ip =
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    'unknown';
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  const data = {
    name: str(body.name, LIMITS.name),
    phone: str(body.phone, LIMITS.phone),
    email: str(body.email, LIMITS.email),
    message: str(body.message, LIMITS.message),
    locale: str(body.locale, LIMITS.locale),
    page: str(body.page, LIMITS.page),
  };
  if (!data.name || !data.message || (!data.phone && !data.email)) {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  const inquiry = await prisma.inquiry.create({ data });
  return Response.json({ ok: true, id: inquiry.id });
}

// The client reports back once EmailJS has (or hasn't) delivered the
// notification, so the admin list shows which inquiries never reached email.
export async function PATCH(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const id = Number(body.id);
  if (!Number.isInteger(id) || id <= 0) return Response.json({ ok: false }, { status: 400 });
  // Only flips false -> true on a fresh row; can't be used to edit content.
  await prisma.inquiry.updateMany({
    where: { id, emailSent: false, createdAt: { gte: new Date(Date.now() - 10 * 60 * 1000) } },
    data: { emailSent: true },
  });
  return Response.json({ ok: true });
}
