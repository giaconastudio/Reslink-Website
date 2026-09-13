'use server';

/* Server actions behind every form on this site that feeds the CRM: the demo
   request, the support message, the /templates download and the three
   newsletter boxes.

   These mirror `contactSalesForm.ts`, `contactSupportForm.ts`,
   `contactFreeResoursesForm.ts` and `subscribe.ts` in the main Reslink app
   (Reslink-Backend-Nest/apps/web) —
   same properties, same contact_source values, same ticket subjects — so a
   lead that arrives from the marketing site is indistinguishable in HubSpot
   from one that arrives from the product.

   Every action returns a result object instead of throwing: the forms need to
   tell someone their message didn't send, and an unhandled server action
   error would only give them a generic failure. */

import {
  NEWSLETTER_ID,
  createCompany,
  createContact,
  createTicket,
  findCompanyByEmail,
  findContactByEmail,
  hubspotEnabled,
  hubspotFetch,
  updateCompany,
  updateContact,
} from '@/lib/hubspot';

export type FormResult = { success: boolean; message?: string };

const OK: FormResult = { success: true };

/** Same wording everywhere: what went wrong upstream is our problem, not
 *  something to explain to the person filling in the form. */
const FAILED = 'Something went wrong on our end. Please try again, or email us directly.';

export type DemoRequest = {
  firstName: string;
  lastName: string;
  email: string;
  /** "Which best describes your organization?" */
  organizationType: string;
  /** "How many roles / students will you use Reslink for?" */
  howPlanToUse: string;
  /** "How can we help you?" */
  comment: string;
  /** "How did you hear about Reslink?" */
  howDidYouHear: string;
};

/**
 * Demo / contact-sales form.
 *
 * An organisation gets both a contact and a company record, because sales
 * works the company. Either may already exist — someone who subscribed to the
 * newsletter last month has a contact but no company — so all four
 * combinations are handled rather than blindly creating duplicates.
 */
export async function submitDemoRequest(data: DemoRequest): Promise<FormResult> {
  if (!data.email) return { success: false, message: 'Email is required' };
  if (!hubspotEnabled()) return OK;

  const contactProperties = {
    contact_source: 'Demo Form',
    how_did_you_hear_about_reslink_: data.howDidYouHear,
    how_will_you_use_reslink_: data.howPlanToUse,
    how_can_we_help: data.comment,
    which_best_describes_your_organization_: data.organizationType || '',
  };

  const companyProperties = {
    how_did_company_hear_about_reslink: data.howDidYouHear,
    how_will_company_use_reslink: data.howPlanToUse,
    how_can_we_help: data.comment,
  };

  try {
    const [existingContact, existingCompany] = await Promise.all([
      findContactByEmail(data.email),
      findCompanyByEmail(data.email),
    ]);

    const contact =
      existingContact ??
      (await createContact({
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        ...contactProperties,
      }));

    const company =
      existingCompany ?? (await createCompany({ company_email: data.email, ...companyProperties }, contact.id));

    /* Only the records that were already there need patching — the ones just
       created were born with these properties. */
    if (existingContact) await updateContact(contact.id, contactProperties);
    if (existingCompany) await updateCompany(company.id, companyProperties);

    await createTicket({
      subject: `Schedule a demo from - ${data.email}`,
      content: data.comment,
      contactId: contact.id,
      companyId: company.id,
    });

    return OK;
  } catch (error) {
    console.error('HubSpot demo request failed:', error);
    return { success: false, message: FAILED };
  }
}

export type SupportRequest = {
  firstName: string;
  lastName: string;
  email: string;
  /** Which of "I need help" / "Partnerships" / "Press" they picked. */
  topic: string;
  comment: string;
};

/**
 * Support form. No company record here — support answers people, not
 * organisations — just a contact and a ticket on the same queue.
 */
export async function submitSupportRequest(data: SupportRequest): Promise<FormResult> {
  if (!data.email) return { success: false, message: 'Email is required' };
  if (!hubspotEnabled()) return OK;

  const contactProperties = {
    contact_source: 'Support Form',
    how_can_we_help: data.comment,
  };

  try {
    const existingContact = await findContactByEmail(data.email);

    const contact =
      existingContact ??
      (await createContact({
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        ...contactProperties,
      }));

    if (existingContact) await updateContact(contact.id, contactProperties);

    /* The topic goes in the subject rather than a property: it's what tells
       whoever picks the ticket up whether it's theirs. */
    await createTicket({
      subject: `Support Request from user - ${data.email}${data.topic ? ` (${data.topic})` : ''}`,
      content: data.comment,
      contactId: contact.id,
    });

    return OK;
  } catch (error) {
    console.error('HubSpot support request failed:', error);
    return { success: false, message: FAILED };
  }
}

export type FreeResourcesRequest = {
  firstName: string;
  /** The /templates form only asks for a first name. */
  lastName?: string;
  email: string;
};

/**
 * Free-resources lead magnet (the /templates download).
 *
 * A contact and nothing else — no ticket, because nobody needs to action it —
 * matching `contactFreeResoursesForm.ts` in the main app. Note this records
 * the lead; it does not send anything. The templates themselves have no
 * delivery mechanism on this site yet.
 */
export async function submitFreeResources(data: FreeResourcesRequest): Promise<FormResult> {
  if (!data.email) return { success: false, message: 'Email is required' };
  if (!hubspotEnabled()) return OK;

  const contactProperties = { contact_source: 'Free Resources Form' };

  try {
    const existingContact = await findContactByEmail(data.email);

    if (existingContact) {
      await updateContact(existingContact.id, contactProperties);
    } else {
      await createContact({
        firstname: data.firstName,
        /* Omitted rather than written blank, so a later form that does ask
           for a surname doesn't have to overwrite an empty string. */
        ...(data.lastName ? { lastname: data.lastName } : {}),
        email: data.email,
        ...contactProperties,
      });
    }

    return OK;
  } catch (error) {
    console.error('HubSpot free resources request failed:', error);
    return { success: false, message: FAILED };
  }
}

/** Flips the newsletter subscription on for an address. */
async function subscribeContact(email: string) {
  const response = await hubspotFetch(`/communication-preferences/v4/statuses/${email}`, {
    method: 'POST',
    body: JSON.stringify({
      subscriptionId: NEWSLETTER_ID,
      statusState: 'SUBSCRIBED',
      legalBasis: 'LEGITIMATE_INTEREST_OTHER',
      legalBasisExplanation: 'Newsletter subscription!',
      channel: 'EMAIL',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to set subscription status');
  }

  return response.json();
}

/**
 * Footer newsletter box. Creates the contact if we've never seen the address,
 * then subscribes it either way.
 */
export async function subscribe(email: string): Promise<FormResult> {
  if (!email) return { success: false, message: 'Email is required' };
  if (!hubspotEnabled()) return OK;

  try {
    const existingContact = await findContactByEmail(email);

    if (existingContact) {
      await updateContact(existingContact.id, { contact_source: 'Newsletter Form' });
    } else {
      await createContact({ email, contact_source: 'Newsletter Form' });
    }

    await subscribeContact(email);
    return OK;
  } catch (error) {
    console.error('HubSpot subscribe failed:', error);
    return { success: false, message: FAILED };
  }
}
