'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "After adding my Reslink to every application, I started getting callbacks within 48 hours. Complete game changer.",
    name: 'Software Engineer',
    role: 'Early access user',
    company: 'hired at a Fortune 500 tech co.',
    initials: 'SE',
    color: '#4F6EF7',
  },
  {
    quote: "I landed my dream job and I genuinely believe the video resume made all the difference. Reslink let me show who I really am.",
    name: 'Marketing Manager',
    role: 'Early access user',
    company: 'hired at a social platform',
    initials: 'MM',
    color: '#A855F7',
  },
  {
    quote: "The analytics feature is unreal. I saw a senior partner watch my video three times. I reached out and got an interview the next morning.",
    name: 'Finance Analyst',
    role: 'Early access user',
    company: 'hired at a Big Four firm',
    initials: 'FA',
    color: '#F59E0B',
  },
  {
    quote: "My recruiter said she had never seen a video resume done that well. She shared it with the entire hiring team before my first interview.",
    name: 'Product Manager',
    role: 'Early access user',
    company: 'hired at a fintech scale-up',
    initials: 'PM',
    color: '#10B981',
  },
  {
    quote: "As a designer I care about how I present myself. Reslink resonated perfectly with the creative teams I was targeting. Two offers in two weeks.",
    name: 'UX Designer',
    role: 'Early access user',
    company: 'two offers in two weeks',
    initials: 'UX',
    color: '#EF4444',
  },
  {
    quote: "I was hesitant about putting a video online, but the platform made it so easy. Within a week I had three recruiter calls lined up.",
    name: 'Supply Chain Analyst',
    role: 'Early access user',
    company: 'hired in automotive',
    initials: 'SC',
    color: '#041635',
  },
  {
    quote: "Honestly thought video resumes were gimmicky. Then I got a reply from a top payments company within 24 hours of sending my Reslink. I was wrong.",
    name: 'Data Scientist',
    role: 'Early access user',
    company: 'hired in fintech',
    initials: 'DS',
    color: '#635BFF',
  },
  {
    quote: "The teleprompter made recording so natural. I didn't have to memorise anything. I recorded a great take on my second try.",
    name: 'Sales Development Rep',
    role: 'Early access user',
    company: 'hired in SaaS',
    initials: 'SD',
    color: '#FF7A59',
  },
];

function Card({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="testi-card" style={{
      background: '#fff', borderRadius: '16px', padding: '24px 26px',
      border: '1px solid #ECEEF1', width: '340px', flexShrink: 0,
      boxShadow: '0 2px 12px rgba(4,22,53,0.05)',
    }}>
      <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
        {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#D8F950" color="#D8F950" />)}
      </div>
      <p style={{ fontSize: '14px', color: '#3A3F4C', lineHeight: 1.65, marginBottom: '20px', fontFamily: 'var(--font-body)' }}>
        &ldquo;{t.quote}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: t.color, display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#fff', fontSize: '12px',
          fontWeight: 700, flexShrink: 0, fontFamily: 'var(--font-phudu)',
        }}>{t.initials}</div>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{t.name}</p>
          <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{t.role} · {t.company}</p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse }: { items: typeof testimonials; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <div className={reverse ? 'testi-track-rev' : 'testi-track'} style={{ display: 'flex', gap: '16px', paddingLeft: '16px' }}>
        {doubled.map((t, i) => <Card key={i} t={t} />)}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const row1 = testimonials.slice(0, 5);
  const row2 = testimonials.slice(3);

  return (
    <section style={{ padding: 'clamp(64px, 8vw, 100px) 0', background: '#F7F8FA', overflow: 'hidden' }}>
      <style>{`
        @keyframes testi-scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes testi-scroll-rev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        .testi-track { animation: testi-scroll 22s linear infinite; display: flex; }
        .testi-track-rev { animation: testi-scroll-rev 26s linear infinite; display: flex; }
        .testi-track:hover, .testi-track-rev:hover { animation-play-state: paused; }
        .testi-row-second { }
        @media (max-width: 640px) {
          .testi-row-second { display: none; }
          .testi-card { width: 280px !important; padding: 18px 20px !important; }
          .testi-track { animation-duration: 14s !important; }
        }
      `}</style>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 56px', padding: '0 24px' }}
      >
        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>
          Success stories
        </p>
        <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#041635', lineHeight: 0.98, marginBottom: '20px' }}>
          Real results from<br />real candidates.
        </h2>
        <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>
          Over 10,000 job seekers have used Reslink to stand out and land interviews at top companies.
        </p>
      </motion.div>

      {/* Marquee rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <MarqueeRow items={row1} />
        <div className="testi-row-second"><MarqueeRow items={row2} reverse /></div>
      </div>
    </section>
  );
}
