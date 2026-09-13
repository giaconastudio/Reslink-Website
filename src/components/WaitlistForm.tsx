'use client';

import { useState } from 'react';
import { CheckCircle, ArrowRight, Mail } from 'lucide-react';

/* The student / veteran waitlist.

   Neither audience can create an account at launch: the half-price rate
   depends on proving you're a student or that you served, and that
   verification (school email for students, ID.me for veterans) isn't live
   yet. Rather than let someone sign up and then discover the discount can't
   be applied, both types collect an email here and hear from us the day
   verification opens.

   Shared by the business branch's neighbour in /get-started, and reachable
   from the students and veterans pages. */

export type WaitlistKind = 'student' | 'veteran';

const COPY: Record<WaitlistKind, { sub: string; success: string; extraLabel: string; extraPlaceholder: string }> = {
  student: {
    sub: 'Student verification is coming very soon. Leave your email and we\'ll tell you the moment it opens — with your 50% off ready to go.',
    success: 'We\'ll email you the moment student verification goes live, and your 50% off will be waiting.',
    extraLabel: 'Where do you study?',
    extraPlaceholder: 'School or university (optional)',
  },
  veteran: {
    sub: 'ID.me verification is coming very soon. Leave your email and we\'ll tell you the moment it opens — with your 50% off ready to go.',
    success: 'We\'ll email you the moment ID.me verification goes live, and your 50% off will be waiting.',
    extraLabel: 'Where did you serve?',
    extraPlaceholder: 'Branch of service (optional)',
  },
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 13px', borderRadius: '10px',
  border: '1.5px solid #E7EAF0', fontSize: '14px',
  fontFamily: 'var(--font-body)', color: '#061A3A', outline: 'none',
  boxSizing: 'border-box', background: '#F6F7F9',
};

export default function WaitlistForm({
  kind,
  /** Rendered under the submit button — e.g. a Back link in the signup flow. */
  footer,
  /** Fires once they're on the list, so the page around it can react. */
  onSent,
}: {
  kind: WaitlistKind;
  footer?: React.ReactNode;
  onSent?: () => void;
}) {
  const copy = COPY[kind];
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', extra: '' });

  if (sent) {
    /* Deliberately narrow and centred, matching the demo request
       confirmation — left to fill a tall column the lines drift apart. */
    return (
      <div style={{ textAlign: 'center', maxWidth: '340px', margin: '0 auto', padding: '32px 0' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#D7FF43', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <CheckCircle size={28} color="#061A3A" strokeWidth={2.5} />
        </div>
        <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '26px', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.02em', marginBottom: '10px' }}>You&apos;re on the list!</h3>
        <p style={{ fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.65, margin: 0 }}>
          {copy.success}
        </p>
        {form.email && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '20px', padding: '9px 14px', background: '#F6F7F9', border: '1px solid #ECEEF1', borderRadius: '100px', maxWidth: '100%' }}>
            <Mail size={14} color="#9AA1AE" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '13px', color: '#3A4150', fontFamily: 'var(--font-body)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{form.email}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: '30px', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.03em', marginBottom: '6px' }}>Join the waitlist</h2>
      <p style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)', lineHeight: 1.55, marginBottom: '18px' }}>{copy.sub}</p>
      <form onSubmit={e => { e.preventDefault(); setSent(true); onSent?.(); }} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="Full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required style={inputStyle} />
        <input type="email" placeholder="Email address" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required style={inputStyle} />
        {/* Optional, and last: the two required fields are all we actually
            need to reach them, so nothing else gets to block the button. */}
        <input type="text" placeholder={copy.extraPlaceholder} aria-label={copy.extraLabel} value={form.extra} onChange={e => setForm(p => ({ ...p, extra: e.target.value }))} style={inputStyle} />
        <button type="submit"
          style={{ width: '100%', padding: '13px', background: '#1468E8', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.15s', marginTop: '4px' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0A52C4'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1468E8'; }}>
          Join the waitlist <ArrowRight size={15} />
        </button>
        <p style={{ fontSize: '12px', color: '#9AA1AE', fontFamily: 'var(--font-body)', textAlign: 'center' }}>No card, no account needed</p>
        {footer}
      </form>
    </>
  );
}
