export const ATTRIBUTION_COOKIE = 'rl_attr';

export interface AttributionPayload {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  clicked_at: number;
  landing_path: string;
}

const MAX_VALUE_LENGTH = 255;
const MAX_FBCLID_LENGTH = 512;
const MAX_PATH_LENGTH = 1024;

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

type StringKey = (typeof UTM_KEYS)[number] | 'fbclid';

const maxLengthFor = (key: StringKey) => (key === 'fbclid' ? MAX_FBCLID_LENGTH : MAX_VALUE_LENGTH);

/**
 * Builds the attribution payload for a landing URL, or null when the visit is not a paid click.
 * A paid click carries an fbclid or utm_medium=paid_social; organic UTM-only traffic (newsletters,
 * email) must not overwrite a previously saved paid click. Values longer than the limits the API
 * enforces are dropped rather than truncated, since a truncated click id would never match.
 */
export function parsePaidClick(url: URL, now: number): AttributionPayload | null {
  const params = url.searchParams;
  const isPaid = Boolean(params.get('fbclid')) || params.get('utm_medium') === 'paid_social';
  if (!isPaid) return null;
  if (url.pathname.length > MAX_PATH_LENGTH) return null;

  const payload: AttributionPayload = { clicked_at: now, landing_path: url.pathname };
  for (const key of [...UTM_KEYS, 'fbclid'] as const) {
    const value = params.get(key);
    if (value && value.length <= maxLengthFor(key)) payload[key] = value;
  }
  return payload;
}

/**
 * Decodes an `rl_attr` cookie value. Any malformed, tampered or oversized value yields null so a
 * bad cookie can never break the page that reads it. The raw header value is URL-encoded, but
 * Next's cookie API hands server code the already-decoded JSON, where a literal `%` (say in a
 * campaign name) would make a second decode throw; decoded JSON always starts with `{`, which
 * an encoded value never does, so that is the cue to skip the decode.
 */
export function readAttribution(raw: string | undefined): AttributionPayload | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw.startsWith('{') ? raw : decodeURIComponent(raw));
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return null;
    const record = parsed as Record<string, unknown>;

    const { clicked_at: clickedAt, landing_path: landingPath } = record;
    if (typeof clickedAt !== 'number' || !Number.isFinite(clickedAt)) return null;
    if (typeof landingPath !== 'string' || landingPath.length > MAX_PATH_LENGTH) return null;

    const payload: AttributionPayload = { clicked_at: clickedAt, landing_path: landingPath };
    for (const key of [...UTM_KEYS, 'fbclid'] as const) {
      const value = record[key];
      if (typeof value === 'string' && value.length <= maxLengthFor(key)) payload[key] = value;
    }
    return payload;
  } catch {
    return null;
  }
}
