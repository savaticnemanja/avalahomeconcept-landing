import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'ahc_admin';

const PUBLIC_ADMIN_PATHS = ['/admin/login'];
const PUBLIC_API_PATHS = ['/api/admin/login'];

const verify = async (token) => {
  if (!token) return false;
  const secret = process.env.SESSION_SECRET;
  if (!secret) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
};

// The root layout renders <html> above the [locale] segment, so it can't read
// the locale param; pass it down as a request header for <html lang>.
const LOCALE_RE = /^\/(sr|en|ru|de)(?:\/|$)/;

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    const headers = new Headers(request.headers);
    headers.set('x-locale', LOCALE_RE.exec(pathname)?.[1] ?? '');
    return NextResponse.next({ request: { headers } });
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const authed = await verify(token);

  if (pathname.startsWith('/api/admin')) {
    if (PUBLIC_API_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
      return NextResponse.next();
    }
    if (!authed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    const isPublic = PUBLIC_ADMIN_PATHS.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`),
    );

    if (isPublic) {
      if (authed && pathname.startsWith('/admin/login')) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    if (!authed) {
      const url = new URL('/admin/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    // Pages only — skip Next internals, API routes, uploads and static files.
    '/((?!_next/|api/|uploads/|.*\\..*).*)',
  ],
};
