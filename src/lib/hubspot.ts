/* HubSpot CRM client.
 *
 * A port of the helpers the main Reslink app uses (`apps/web/src/app/actions/*`
 * in Reslink-Backend-Nest), kept deliberately close to the original so both
 * codebases write the same custom properties into the same CRM. Rename a
 * property here and the two halves of the funnel stop lining up, so the
 * property names below are the contract, not a detail.
 *
 * Server-only: the token is read from HUBSPOT_ACCESS_TOKEN and never reaches
 * the browser — every caller is a server action in src/app/actions, and
 * nothing in here is imported from a client component.
 */

const HUBSPOT_BASE_URL = 'https://api.hubapi.com';

/** Everything created from this site is owned by the same sales inbox. */
export const OWNER_ID = '628246608';

/** The marketing newsletter subscription in HubSpot. */
export const NEWSLETTER_ID = '528474154';

/** True when a token is configured, i.e. this deploy is allowed to talk to
 *  the CRM. The main app gates on `isProd`; here it's the token's presence,
 *  which comes to the same thing (only production carries the secret) without
 *  needing a second environment flag. */
export function hubspotEnabled(): boolean {
  return Boolean(process.env.HUBSPOT_ACCESS_TOKEN);
}

/**
 * Single choke point for every HubSpot API call.
 *
 * With a token configured, delegates to fetch with the base URL + auth header.
 * Without one, short-circuits with a synthetic empty response and makes NO
 * network call — search helpers see an empty result set and callers' own
 * guards skip the downstream writes, so local dev and staging stay silent.
 */
export async function hubspotFetch(path: string, init?: RequestInit): Promise<Response> {
  if (!hubspotEnabled()) {
    return new Response(JSON.stringify({ results: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return fetch(`${HUBSPOT_BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });
}

export type HubSpotObject = { id: string; properties: Record<string, string> };

export type HubSpotProperties = Record<string, string>;

/** Association type ids, as HubSpot defines them. */
const ASSOC = {
  /** company → contact */
  companyToContact: 280,
  /** ticket → contact */
  ticketToContact: 16,
  /** ticket → company */
  ticketToCompany: 26,
} as const;

async function searchByProperty(
  objectType: 'contacts' | 'companies',
  propertyName: string,
  value: string,
): Promise<HubSpotObject | null> {
  const response = await hubspotFetch(`/crm/v3/objects/${objectType}/search`, {
    method: 'POST',
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName, operator: 'EQ', value }] }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to search ${objectType}`);
  }

  const data = await response.json();
  return data.results?.length > 0 ? data.results[0] : null;
}

export function findContactByEmail(email: string) {
  return searchByProperty('contacts', 'email', email);
}

/* Companies are matched on the custom `company_email` property rather than
   HubSpot's domain, because that's the only thing a demo form gives us. */
export function findCompanyByEmail(email: string) {
  return searchByProperty('companies', 'company_email', email);
}

export async function createContact(properties: HubSpotProperties): Promise<HubSpotObject> {
  const response = await hubspotFetch('/crm/v3/objects/contacts', {
    method: 'POST',
    body: JSON.stringify({
      properties: { hs_lead_status: 'NEW', hubspot_owner_id: OWNER_ID, ...properties },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create contact');
  }

  return response.json();
}

export async function updateContact(contactId: string, properties: HubSpotProperties) {
  const response = await hubspotFetch(`/crm/v3/objects/contacts/${contactId}`, {
    method: 'PATCH',
    body: JSON.stringify({ properties }),
  });

  if (!response.ok) {
    throw new Error('Failed to update contact');
  }

  return response.json();
}

export async function createCompany(
  properties: HubSpotProperties,
  contactId: string,
): Promise<HubSpotObject> {
  const response = await hubspotFetch('/crm/v3/objects/companies', {
    method: 'POST',
    body: JSON.stringify({
      properties: { name: '', hubspot_owner_id: OWNER_ID, ...properties },
      associations: [
        {
          to: { id: contactId, type: 'contact' },
          types: [
            {
              associationCategory: 'HUBSPOT_DEFINED',
              associationTypeId: ASSOC.companyToContact,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create company');
  }

  return response.json();
}

export async function updateCompany(companyId: string, properties: HubSpotProperties) {
  const response = await hubspotFetch(`/crm/v3/objects/companies/${companyId}`, {
    method: 'PATCH',
    body: JSON.stringify({ properties }),
  });

  if (!response.ok) {
    throw new Error('Failed to update company');
  }

  return response.json();
}

/**
 * Opens a HIGH priority ticket in the default pipeline's first stage — the
 * same place the main app files demo and support requests, so sales and
 * support keep working one queue.
 *
 * A failed ticket must not fail the submission: the contact is already saved
 * by this point and the person on the form has nothing to do about it, so
 * this logs and returns null rather than throwing.
 */
export async function createTicket({
  subject,
  content,
  contactId,
  companyId,
}: {
  subject: string;
  content: string;
  contactId: string;
  companyId?: string;
}) {
  const associations: {
    to: { id: string; type: string };
    types: { associationCategory: string; associationTypeId: number }[];
  }[] = [
    {
      to: { id: contactId, type: 'contact' },
      types: [
        { associationCategory: 'HUBSPOT_DEFINED', associationTypeId: ASSOC.ticketToContact },
      ],
    },
  ];

  if (companyId) {
    associations.push({
      to: { id: companyId, type: 'company' },
      types: [
        { associationCategory: 'HUBSPOT_DEFINED', associationTypeId: ASSOC.ticketToCompany },
      ],
    });
  }

  const response = await hubspotFetch('/crm/v3/objects/tickets', {
    method: 'POST',
    body: JSON.stringify({
      properties: {
        hs_pipeline: '0',
        hs_pipeline_stage: '1',
        hs_ticket_priority: 'HIGH',
        subject,
        content,
        hubspot_owner_id: OWNER_ID,
      },
      associations,
    }),
  });

  if (!response.ok) {
    console.error('HubSpot: failed to create ticket:', await response.text());
    return null;
  }

  return response.json();
}
