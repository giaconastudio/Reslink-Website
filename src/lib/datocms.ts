/* DatoCMS Content Delivery API client.
 *
 * Mirrors the `request` helper the main Reslink app uses, so queries can be
 * moved between the two codebases unchanged. The token is read from
 * DATOCMS_API_TOKEN and never reaches the browser — every caller is a server
 * component, so the key stays server-side.
 */

const DATOCMS_ENDPOINT = 'https://graphql.datocms.com/';

/** How long fetched content stays cached before Next re-validates it (seconds). */
export const BLOG_REVALIDATE = 300;

type RequestArgs = {
  query: string;
  variables?: Record<string, unknown>;
  /** Preview drafts instead of published content. */
  includeDrafts?: boolean;
  revalidate?: number;
};

export async function request<T>({
  query,
  variables = {},
  includeDrafts = false,
  revalidate = BLOG_REVALIDATE,
}: RequestArgs): Promise<T> {
  const token = process.env.DATOCMS_API_TOKEN;
  if (!token) {
    throw new Error(
      'DATOCMS_API_TOKEN is not set. Add it to .env.local (pull it with `vercel env pull .env.local --environment=production`).'
    );
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  if (includeDrafts) headers['X-Include-Drafts'] = 'true';

  const res = await fetch(DATOCMS_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`DatoCMS request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`DatoCMS returned errors: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}
