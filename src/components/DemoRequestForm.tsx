'use client';

import { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

/* The book-a-demo lead form. Lives here rather than inline on the sales page
   because organisations meet it in two places now: /contact/sales, and the
   business branch of /get-started, where picking Company, Recruitment Agency
   or University leads to a demo instead of a self-serve account. */

export type OrgKind = 'company' | 'agency' | 'university';

const ORG_LABEL: Record<OrgKind, string> = {
  company: 'Company',
  agency: 'Recruitment agency',
  university: 'University',
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 13px', borderRadius: '10px',
  border: '1.5px solid #E7EAF0', fontSize: '14px',
  fontFamily: 'var(--font-body)', color: '#061A3A', outline: 'none',
  boxSizing: 'border-box', background: '#F6F7F9',
};

const selectStyle = (val: string): React.CSSProperties => ({
  ...inputStyle, appearance: 'none', cursor: 'pointer', paddingRight: '40px',
  color: val ? '#061A3A' : '#9AA1AE',
});

function Chevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9AA1AE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function DemoRequestForm({
  heading = 'Book your demo',
  sub = 'Pick a time on the next screen. No back-and-forth.',
  /** Preselects the organisation dropdown when the type is already known. */
  orgKind,
  /** Rendered under the submit button — e.g. a Back link in the signup flow. */
  footer,
}: {
  heading?: string;
  sub?: string;
  orgKind?: OrgKind;
  footer?: React.ReactNode;
} = {}) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', rolesCount: '',
    // Already answered by the card they picked on the previous step, so it
    // starts filled in rather than asking them the same thing twice.
    orgType: orgKind ? ORG_LABEL[orgKind] : '',
    message: '', hearAbout: '',
  });

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#D7FF43', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
          <CheckCircle size={28} color="#061A3A" strokeWidth={2.5} />
        </div>
        <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '26px', fontWeight: 900, color: '#061A3A', marginBottom: '10px' }}>Request received!</h3>
        <p style={{ fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
          Check your email — we&apos;ll send a link to pick a time that works for you.
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: '24px', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.02em', marginBottom: '4px' }}>{heading}</h2>
      <p style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)', lineHeight: 1.55, marginBottom: '16px' }}>{sub}</p>
      <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className="demo-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <input type="text" placeholder="First name" value={form.firstName} onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))} required style={inputStyle} />
          <input type="text" placeholder="Last name" value={form.lastName} onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))} required style={inputStyle} />
        </div>
        <input type="email" placeholder="Business email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required style={inputStyle} />
        <div style={{ position: 'relative' }}>
          <select value={form.rolesCount} onChange={e => setForm(p => ({ ...p, rolesCount: e.target.value }))} required style={selectStyle(form.rolesCount)}>
            <option value="" disabled>How many roles / students will you use Reslink for?</option>
            <option>For 1-10 roles</option>
            <option>For 10-100 roles</option>
            <option>For &gt;100 roles</option>
            <option>Not sure yet</option>
          </select>
          <Chevron />
        </div>
        <div style={{ position: 'relative' }}>
          <select value={form.orgType} onChange={e => setForm(p => ({ ...p, orgType: e.target.value }))} required style={selectStyle(form.orgType)}>
            <option value="" disabled>Which best describes your organization?</option>
            <option>Company</option>
            <option>Recruitment agency</option>
            <option>University</option>
          </select>
          <Chevron />
        </div>
        <textarea placeholder="How can we help you?" rows={3} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' } as React.CSSProperties} />
        <input type="text" placeholder="How did you hear about Reslink?" value={form.hearAbout} onChange={e => setForm(p => ({ ...p, hearAbout: e.target.value }))} style={inputStyle} />
        <button type="submit"
          style={{ width: '100%', padding: '13px', background: '#1468E8', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.15s', marginTop: '4px' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0A52C4'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1468E8'; }}>
          Choose a time <ArrowRight size={15} />
        </button>
        <p style={{ fontSize: '12px', color: '#9AA1AE', fontFamily: 'var(--font-body)', textAlign: 'center' }}>Takes about 40 seconds</p>
        {footer}
      </form>
    </>
  );
}
