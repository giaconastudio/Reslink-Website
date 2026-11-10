import { NextResponse, type NextRequest } from 'next/server';
import { ATTRIBUTION_COOKIE, readAttribution } from '@/lib/attribution';
import { APP_SIGNUP_URL } from '@/lib/links';

export const TRIAL_CAMPAIGNS = ['two-week-trial', 'try-free', 'free-trial'];

const APP_JOIN_URL = 'https://app.reslink.io/join';

/**
 * Sends a lander button to the app's trial signup for that campaign, carrying the visitor's saved
 * UTMs along (the app is another origin and cannot read the cookie's values from the page). An
 * unknown campaign falls back to the ordinary signup rather than a 404.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ campaign: string }> },
) {
  const { campaign } = await params;
  if (!TRIAL_CAMPAIGNS.includes(campaign)) return NextResponse.redirect(APP_SIGNUP_URL, 302);

  const target = new URL(`${APP_JOIN_URL}/${campaign}`);
  const attribution = readAttribution(request.cookies.get(ATTRIBUTION_COOKIE)?.value);
  for (const [key, value] of Object.entries(attribution ?? {})) {
    if (key.startsWith('utm_') && typeof value === 'string') target.searchParams.set(key, value);
  }
  return NextResponse.redirect(target, 302);
}
