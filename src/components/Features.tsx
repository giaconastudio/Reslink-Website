'use client';

import { motion } from 'framer-motion';

function AnalyticsMockup() {
  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #EEEEF0', boxShadow: '0 8px 32px rgba(11,20,55,0.08)' }}>
      <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9A9FA8', marginBottom: '20px' }}>This week</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        {[
          { label: 'Profile views', value: '342', change: '+28%' },
          { label: 'Video plays', value: '189', change: '+15%' },
          { label: 'Click-throughs', value: '47', change: '+42%' },
          { label: 'Recruiter contacts', value: '12', change: '+8' },
        ].map(s => (
          <div key={s.label} style={{ background: '#F7F8FA', borderRadius: '10px', padding: '14px' }}>
            <p style={{ fontWeight: 700, fontSize: '22px', color: '#0C1E5B' }}>{s.value}</p>
            <p style={{ fontSize: '11px', color: '#9A9FA8', marginTop: '2px' }}>{s.label}</p>
            <p style={{ fontSize: '11px', color: '#22c55e', marginTop: '4px', fontWeight: 600 }}>{s.change}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '52px' }}>
        {[30, 50, 38, 68, 52, 88, 62].map((h, i) => (
          <div key={i} style={{ flex: 1, borderRadius: '3px 3px 0 0', height: `${h}%`, background: i === 5 ? '#C5E63A' : '#EEEEF0' }} />
        ))}
      </div>
      <p style={{ fontSize: '11px', color: '#C8CBD2', textAlign: 'center', marginTop: '8px' }}>Views — last 7 days</p>
    </div>
  );
}

function SearchMockup() {
  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #EEEEF0', boxShadow: '0 8px 32px rgba(11,20,55,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F7F8FA', borderRadius: '10px', padding: '10px 14px', marginBottom: '16px' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9A9FA8" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <span style={{ fontSize: '13px', color: '#9A9FA8' }}>Search by role, skill, location...</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          { name: 'Oliver Stone', role: 'Supply Chain · New York', initials: 'OS', color: '#0C1E5B' },
          { name: 'Priya Patel', role: 'UX Designer · London', initials: 'PP', color: '#A855F7' },
          { name: 'Marcus Lee', role: 'Finance Analyst · Toronto', initials: 'ML', color: '#10B981' },
        ].map(c => (
          <div key={c.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F7F8FA', borderRadius: '10px', padding: '12px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>{c.initials}</div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#0C1E5B' }}>{c.name}</p>
                <p style={{ fontSize: '12px', color: '#9A9FA8' }}>{c.role}</p>
              </div>
            </div>
            <button style={{ background: '#EBF5D6', color: '#0C1E5B', fontSize: '12px', fontWeight: 600, padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>View</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const sections = [
  {
    label: 'For Job Seekers',
    title: 'Your profile works for you, 24/7.',
    desc: "While you sleep, recruiters discover your video resume. Every view is tracked, every play is recorded. You'll always know when to follow up.",
    href: '/job-seekers',
    mockup: 'analytics',
    reverse: false,
  },
  {
    label: 'For Companies',
    title: 'Find candidates who stand out.',
    desc: 'Browse a curated pool of video resumes. See the real person behind the application before scheduling a single interview.',
    href: '/companies',
    mockup: 'search',
    reverse: true,
  },
];

export default function Features() {
  return (
    <section style={{ padding: '96px 0', background: '#fff' }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '96px' }}>
          {sections.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '64px',
                alignItems: 'center',
                direction: s.reverse ? 'rtl' : 'ltr',
              }}
            >
              <div style={{ direction: 'ltr' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C5E63A', marginBottom: '14px' }}>{s.label}</p>
                <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#0C1E5B', lineHeight: 1.15, marginBottom: '16px' }}>{s.title}</h2>
                <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.65, marginBottom: '28px' }}>{s.desc}</p>
                <a href={s.href} className="btn-outline" style={{ display: 'inline-flex' }}>Learn more →</a>
              </div>
              <div style={{ direction: 'ltr' }}>
                {s.mockup === 'analytics' ? <AnalyticsMockup /> : <SearchMockup />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
