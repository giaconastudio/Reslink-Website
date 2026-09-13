'use client';

import { useState } from 'react';
import { subscribe } from '@/app/actions/hubspot';

/* The newsletter signup that appears on the blog — once under the index, once
   in every article's sidebar. Both sit on the same navy panel and differ only
   in shape, so they share this component and pick a variant:

     inline   wide row, input beside the button (blog index CTA)
     stacked  narrow column, button under the input (article sidebar)

   Same destination as the footer box: a HubSpot contact sourced to
   "Newsletter Form" plus the marketing subscription. Styles are inline rather
   than classed because these two live on pages that style everything inline;
   matching the neighbours beats introducing a stylesheet for one component. */

type Variant = 'inline' | 'stacked';

const inputStyle: Record<Variant, React.CSSProperties> = {
  inline: {
    width: '300px', maxWidth: '100%', padding: '15px 18px', borderRadius: '12px',
    border: 'none', background: '#fff', color: '#061A3A', fontSize: '15px',
    fontFamily: 'var(--font-body)', outline: 'none',
  },
  stacked: {
    width: '100%', padding: '10px 12px', borderRadius: '9px',
    border: '1.5px solid rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.08)',
    color: '#fff', fontSize: '13px', fontFamily: 'var(--font-body)',
    boxSizing: 'border-box', outline: 'none', marginBottom: '8px',
  },
};

const buttonStyle: Record<Variant, React.CSSProperties> = {
  inline: {
    padding: '15px 28px', background: '#D7FF43', color: '#061A3A', border: 'none',
    borderRadius: '12px', fontSize: '15px', fontWeight: 800,
    fontFamily: 'var(--font-body)', whiteSpace: 'nowrap',
  },
  stacked: {
    width: '100%', padding: '11px', background: '#D7FF43', color: '#061A3A',
    border: 'none', borderRadius: '9px', fontSize: '13px', fontWeight: 800,
    fontFamily: 'var(--font-body)',
  },
};

const formStyle: Record<Variant, React.CSSProperties> = {
  inline: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  stacked: {},
};

export default function NewsletterForm({
  variant,
  /** Placeholder differs between the two: the sidebar is too narrow for an
      example address to fit. */
  placeholder = variant === 'inline' ? 'example@mail.com' : 'Your email',
}: {
  variant: Variant;
  placeholder?: string;
}) {
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

  /* Replaces the field rather than sitting beside it — once they're on the
     list there's nothing left to type, and an empty box invites a second go. */
  if (done) {
    return (
      <p role="status" style={{
        fontSize: variant === 'inline' ? '15px' : '13px',
        color: '#D7FF43', fontFamily: 'var(--font-body)', lineHeight: 1.55, margin: 0,
        maxWidth: variant === 'inline' ? '340px' : undefined,
      }}>
        Thanks — you&apos;re on the list. Look out for us in your inbox.
      </p>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={formStyle[variant]}>
        <input
          type="email"
          placeholder={placeholder}
          aria-label="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className={variant === 'stacked' ? 'toc-news-input' : undefined}
          style={inputStyle[variant]}
        />
        <button type="submit" disabled={sending}
          style={{ ...buttonStyle[variant], cursor: sending ? 'wait' : 'pointer', opacity: sending ? 0.7 : 1 }}>
          {sending ? 'Sending…' : 'Subscribe'}
        </button>
      </form>
      {error && (
        <p role="alert" style={{
          fontSize: variant === 'inline' ? '13px' : '12px',
          color: '#FF9B9B', fontFamily: 'var(--font-body)', lineHeight: 1.5,
          margin: variant === 'inline' ? '10px 0 0' : '8px 0 0',
        }}>{error}</p>
      )}
    </>
  );
}
