'use client';

import { useState } from 'react';
import { subscribe } from '@/app/actions/hubspot';

/* The footer newsletter box. Split out of Footer so the footer itself stays a
   server component — only this small island needs to be interactive.

   Submitting creates or updates the HubSpot contact with a "Newsletter Form"
   source and flips on the marketing subscription, matching what the product's
   own subscribe action does. Styling comes from the .footer-* classes Footer
   defines, so the markup here is intentionally class-only. */

export default function SubscribeBox() {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);

    const result = await subscribe(email);

    setSending(false);

    if (!result.success) {
      setError(result.message ?? 'Something went wrong. Please try again.');
      return;
    }

    setDone(true);
  }

  /* Replaces the field rather than sitting under it: once they're subscribed
     there's nothing left to type, and an empty box invites a second go. */
  if (done) {
    return (
      <p className="footer-subscribed" role="status">
        Thanks — you&apos;re on the list. Look out for us in your inbox.
      </p>
    );
  }

  return (
    <>
      <form className="footer-sub" onSubmit={handleSubmit}>
        <input
          className="footer-input"
          type="email"
          placeholder="example@mail.com"
          aria-label="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button className="footer-sub-btn" type="submit" disabled={sending}>
          {sending ? 'Sending…' : 'Subscribe'}
        </button>
      </form>
      {error && (
        <p className="footer-sub-error" role="alert">{error}</p>
      )}
    </>
  );
}
