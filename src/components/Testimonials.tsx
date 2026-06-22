'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "After adding my Reslink to every application, I started getting callbacks within 48 hours. It's a complete game changer.",
    name: 'Ben Harper',
    role: 'Software Engineer at Amazon',
    initials: 'BH',
    color: '#4F6EF7',
  },
  {
    quote: "I landed my dream job and I genuinely believe the video resume made all the difference. Reslink let me show who I really am.",
    name: 'Sofia Rodriguez',
    role: 'Marketing Manager at Meta',
    initials: 'SR',
    color: '#A855F7',
  },
  {
    quote: "The analytics feature is unreal. I saw a senior partner at EY watch my video three times — I reached out that afternoon and got an interview the next morning.",
    name: 'Marcus Williams',
    role: 'Finance Analyst at EY',
    initials: 'MW',
    color: '#F59E0B',
  },
  {
    quote: "My recruiter said she had never seen a video resume done that well. She shared it with the entire hiring team before I even had an interview.",
    name: 'Elena Kowalski',
    role: 'Product Manager at Revolut',
    initials: 'EK',
    color: '#10B981',
  },
  {
    quote: "As a designer I care about how I present myself. Reslink resonated with the creative teams I was targeting. Two offers in two weeks.",
    name: 'Priya Patel',
    role: 'UX Designer at Google',
    initials: 'PP',
    color: '#EF4444',
  },
  {
    quote: "I was hesitant about putting a video online, but the platform made it so easy. Within a week I had three recruiter calls lined up.",
    name: 'James Chen',
    role: 'Supply Chain Analyst at Tesla',
    initials: 'JC',
    color: '#041635',
  },
];

const stats = [
  { value: '10,000+', label: 'Active job seekers' },
  { value: '3×', label: 'More recruiter callbacks' },
  { value: '48 hrs', label: 'Avg. to first response' },
  { value: '92%', label: 'Would recommend' },
];

export default function Testimonials() {
  return (
    <section style={{ padding: '96px 0', background: '#F7F8FA' }}>
      <style>{`
        @media (max-width: 900px) { .testi-grid { grid-template-columns: 1fr 1fr !important; } .testi-stats { grid-template-columns: 1fr 1fr !important; gap: 28px 16px !important; } }
        @media (max-width: 600px) { .testi-grid { grid-template-columns: 1fr !important; } }
        .testi-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .testi-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(4,22,53,0.1); }
      `}</style>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 48px' }}
        >
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px' }}>
            Success stories
          </p>
          <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#041635', lineHeight: 0.98 }}>
            Real results from<br />real candidates.
          </h2>
        </motion.div>

        {/* Stat band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="testi-stats"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '48px' }}
        >
          {stats.map((s, i) => (
            <div key={s.label} style={{ textAlign: 'center', padding: '0 8px', borderLeft: i === 0 ? 'none' : '1px solid #E4E7EC' }}>
              <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, color: '#041635', lineHeight: 1, letterSpacing: '-0.03em' }}>{s.value}</p>
              <p style={{ fontSize: '13px', color: '#5C6070', marginTop: '8px', fontFamily: 'var(--font-body)' }}>{s.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="testi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="testi-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #ECEEF1',
                boxShadow: '0 1px 3px rgba(11,20,55,0.04)',
              }}
            >
              <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#D8F950" color="#D8F950" />)}
              </div>
              <p style={{ fontSize: '15px', color: '#3A3F4C', lineHeight: 1.65, flex: 1, marginBottom: '22px', fontFamily: 'var(--font-body)' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: t.color, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: '#fff', fontSize: '12px',
                  fontWeight: 700, flexShrink: 0, fontFamily: 'var(--font-phudu)',
                }}>{t.initials}</div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>{t.name}</p>
                  <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
