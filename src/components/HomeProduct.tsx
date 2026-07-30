'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Video, BarChart3, Link2 } from 'lucide-react';

const points = [
  { icon: Video, title: 'A 60-second video pitch', body: 'AI drafts the script from a resume, and a built-in teleprompter keeps the delivery natural on camera.' },
  { icon: BarChart3, title: 'Analytics on every view', body: 'Both sides see what actually happened: who opened the profile, how long they watched, and what they clicked.' },
  { icon: Link2, title: 'One link that works anywhere', body: 'Drop a Reslink into an application, an email signature, or a client shortlist. No attachments, no logins.' },
];

/** Neutral product explainer for the shared homepage — shows what a Reslink
 *  actually is without pitching a single audience. */
export default function HomeProduct() {
  return (
    <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
      <style>{`
        .hp-inner { max-width: 1080px; margin: 0 auto; }
        .hp-grid { display: grid; grid-template-columns: 1fr 1.05fr; gap: clamp(36px, 5vw, 72px); align-items: center; }
        @media (max-width: 900px) { .hp-grid { grid-template-columns: 1fr; } }
        .hp-frame {
          border-radius: 18px; overflow: hidden; border: 1px solid #E6E8EC; background: #fff;
          box-shadow: 0 30px 90px rgba(4,22,53,0.16), 0 6px 22px rgba(4,22,53,0.07);
          text-decoration: none; display: block;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hp-frame:hover { transform: translateY(-4px); box-shadow: 0 40px 110px rgba(4,22,53,0.22); }
        .hp-bar { background: #F7F8FA; padding: 11px 16px; border-bottom: 1px solid #EEEEF0; display: flex; align-items: center; gap: 6px; }
        .hp-video { position: relative; overflow: hidden; background: #060D24; aspect-ratio: 16/10; width: 100%; }
        .hp-point { display: flex; gap: 14px; }
        .hp-point + .hp-point { margin-top: 26px; }
      `}</style>

      <div className="hp-inner">
        <div className="hp-grid">
          {/* Copy */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>What a Reslink is</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.2vw, 52px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '20px' }}>
                A resume you can<br />actually watch.
              </h2>
              <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '36px' }}>
                One page that pairs a short video pitch with the resume details, living behind a single link that anyone can open on any device.
              </p>
            </motion.div>

            {points.map((p, i) => (
              <motion.div
                key={p.title}
                className="hp-point"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '999px' }}
                transition={{ delay: 0.08 + i * 0.08, duration: 0.4 }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '11px', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <p.icon size={18} color="#0C63E3" strokeWidth={1.9} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '18px', fontWeight: 900, color: '#041635', letterSpacing: '-0.015em', lineHeight: 1.15, marginBottom: '6px' }}>{p.title}</h3>
                  <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Live example */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '999px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/oliviastone" className="hp-frame" aria-label="Explore an example Reslink">
              <div className="hp-bar">
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FEBC2E', display: 'inline-block' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840', display: 'inline-block' }} />
                <div style={{ flex: 1, margin: '0 12px', background: '#EAECEF', borderRadius: '6px', padding: '4px 14px', fontSize: '11px', color: '#9A9FA8', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
                  reslink.io/oliviastone
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#0C63E3', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Open example <ArrowRight size={11} />
                </span>
              </div>
              <div className="hp-video">
                <video
                  src="/videos/hero.mp4"
                  poster="/videos/hero-poster.jpg"
                  autoPlay muted loop playsInline preload="metadata"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.06)' }}
                />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
