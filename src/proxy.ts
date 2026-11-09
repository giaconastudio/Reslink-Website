import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ATTRIBUTION_COOKIE, parsePaidClick } from '@/lib/attribution';

const COOKIE_DOMAIN = '.reslink.io';
const THIRTY_DAYS_SECONDS = 60 * 60 * 24 * 30;

const isReslinkHost = (host: string) => host === 'reslink.io' || host.endsWith('.reslink.io');

/**
 * Saves the visitor's last paid ad click in a cookie shared with the app subdomain, so the API can
 * attribute the signup that happens there. Each new paid click replaces the previous one.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const payload = parsePaidClick(request.nextUrl, Date.now());
  if (!payload) return response;

  // Domain and Secure only apply on reslink.io hosts; on localhost a Secure cookie would be
  // rejected over http and the dev server could never set it.
  const requestHost = (request.headers.get('host') ?? request.nextUrl.hostname)
    .split(':')[0]
    .toLowerCase();
  const onReslink = isReslinkHost(requestHost);
  // Next percent-encodes the cookie value itself, so the raw JSON is passed to yield
  // encodeURIComponent(JSON) on the wire; encoding here too would double-encode it.
  response.cookies.set(ATTRIBUTION_COOKIE, JSON.stringify(payload), {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: THIRTY_DAYS_SECONDS,
    path: '/',
    ...(onReslink ? { domain: COOKIE_DOMAIN, secure: true } : {}),
  });
  return response;
}

export const config = {
  // Skip framework internals, API routes and any path with a file extension (static assets).
  matcher: ['/((?!api|_next/|.*\\..*).*)'],
};
