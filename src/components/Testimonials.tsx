'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "After adding my Reslink to every application, I started getting callbacks within 48 hours. Complete game changer.",
    name: 'Ben Harper',
    role: 'Software Engineer',
    company: 'Amazon',
    initials: 'BH',
    color: '#4F6EF7',
  },
  {
    quote: "I landed my dream job and I genuinely believe the video resume made all the difference. Reslink let me show who I really am.",
    name: 'Sofia Rodriguez',
    role: 'Marketing Manager',
    company: 'Meta',
    initials: 'SR',
    color: '#A855F7',
  },
  {
    quote: "The analytics feature is unreal. I saw a senior partner watch my video three times — I reached out and got an interview the next morning.",
    name: 'Marcus Williams',
    role: 'Finance Analyst',
    company: 'EY',
    initials: 'MW',
    color: '#F59E0B',
  },
  {
    quote: "My recruiter said she had never seen a video resume done that well. She shared it with the entire hiring team before my first interview.",
    name: 'Elena Kowalski',
    role: 'Product Manager',
    company: 'Revolut',
    initials: 'EK',
    color: '#10B981',
  },
  {
    quote: "As a designer I care about how I present myself. Reslink resonated perfectly with the creative teams I was targeting. Two offers in two weeks.",
    name: 'Priya Patel',
    role: 'UX Designer',
    company: 'Google',
    initials: 'PP',
    color: '#EF4444',
  },
  {
    quote: "I was hesitant about putting a video online, but the platform made it so easy. Within a week I had three recruiter calls lined up.",
    name: 'James Chen',
    role: 'Supply Chain Analyst',
    company: 'Tesla',
    initials: 'JC',
    color: '#041635',
  },
  {
    quote: "Honestly thought video resumes were gimmicky. Then I got a reply from Stripe within 24 hours of sending my Reslink. I was wrong.",
    name: 'Aisha Mensah',
    role: 'Data Scientist',
    company: 'Stripe',
    initials: 'AM',
    color: '#635BFF',
  },
  {
    quote: "The teleprompter made recording so natural — I didn't have to memorise anything. I recorded a great take on my second try.",
    name: 'Luca Romano',
    role: 'Sales Development Rep',
    company: 'HubSpot',
    initials: 'LR',
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

function CountUp({ end, suffix, duration = 1.6 }: { end: number; suffix: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const frame = () => {
      const elapsed = (Date.now() - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { end: 10000, suffix: '+', label: 'Active job seekers' },
  { end: 92, suffix: '%', label: 'Would recommend Reslink' },
  { end: 24, suffix: 'h', label: 'Fastest interview booked' },
  { end: 50, suffix: '+', label: 'Countries represented on Reslink' },
];

export default function Testimonials() {
  const row1 = testimonials.slice(0, 5);
  const row2 = testimonials.slice(3);

  return (
    <section style={{ padding: 'clamp(64px, 8vw, 100px) 0', background: '#F7F8FA', overflow: 'hidden' }}>
      <style>{`
        @keyframes testi-scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes testi-scroll-rev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        .testi-track { animation: testi-scroll 40s linear infinite; display: flex; }
        .testi-track-rev { animation: testi-scroll-rev 44s linear infinite; display: flex; }
        .testi-track:hover, .testi-track-rev:hover { animation-play-state: paused; }
        .testi-row-second { }
        @media (max-width: 640px) {
          .testi-row-second { display: none; }
          .testi-card { width: 280px !important; padding: 18px 20px !important; }
        }
      `}</style>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '72px' }}>
        <MarqueeRow items={row1} />
        <div className="testi-row-second"><MarqueeRow items={row2} reverse /></div>
      </div>

      {/* Count-up stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="testi-stats">
          {stats.map((s, i) => (
            <div key={s.label} style={{ textAlign: 'center', padding: '24px 8px', background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', boxShadow: '0 2px 8px rgba(4,22,53,0.04)' }}>
              <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 3.5vw, 44px)', fontWeight: 900, color: '#041635', lineHeight: 1, letterSpacing: '-0.03em' }}>
                <CountUp end={s.end} suffix={s.suffix} />
              </p>
              <p style={{ fontSize: '13px', color: '#5C6070', marginTop: '8px', fontFamily: 'var(--font-body)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <style>{`.testi-stats { } @media (max-width: 640px) { .testi-stats { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  );
}
