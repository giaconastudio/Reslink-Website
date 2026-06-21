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

export default function Testimonials() {
  return (
    <section style={{ padding: '96px 0', background: '#F7F8FA' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto 56px' }}
        >
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '16px' }}>
            Success stories
          </p>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#041635', lineHeight: 1.12 }}>
            Real results from real candidates
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{
                background: '#fff',
                borderRadius: '14px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 1px 3px rgba(11,20,55,0.05)',
              }}
            >
              <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#D8F950" color="#D8F950" />)}
              </div>
              <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, flex: 1, marginBottom: '20px' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: t.color, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: '#fff', fontSize: '11px',
                  fontWeight: 700, flexShrink: 0,
                }}>{t.initials}</div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635' }}>{t.name}</p>
                  <p style={{ fontSize: '12px', color: '#9A9FA8' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
