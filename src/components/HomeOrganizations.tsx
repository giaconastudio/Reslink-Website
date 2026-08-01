'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Building2, Users, GraduationCap } from 'lucide-react';

const items = [
  { label: 'Companies', href: '/companies', desc: 'Screen more candidates in less time and see who is genuinely a fit.', icon: Building2 },
  { label: 'Recruitment Agencies', href: '/agencies', desc: 'Send clients branded video shortlists and win briefs on real engagement data.', icon: Users },
  { label: 'Universities', href: '/universities', desc: 'Give every student a video pitch and prove your placement outcomes.', icon: GraduationCap },
];

/** Homepage section for the organizations audience — anchored so the hero's
 *  "Learn more" link scrolls straight here. */
export default function HomeOrganizations() {
  return (
    <section id="organizations" style={{ background: '#041635', padding: 'clamp(72px, 9vw, 108px) 24px', position: 'relative', overflow: 'hidden', scrollMarginTop: '84px' }}>
      <div style={{ position: 'absolute', top: '-10%', right: '-8%', width: '600px', height: '500px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 65%)', pointerEvents: 'none' }} />

      <style>{`
        .horg-inner { max-width: 1080px; margin: 0 auto; position: relative; z-index: 1; }
        .horg-head { max-width: 620px; margin: 0 auto clamp(48px, 6vw, 68px); text-align: center; }
        .horg-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        @media (max-width: 760px) { .horg-cards { grid-template-columns: 1fr; } }
        .horg-card {
          display: flex; flex-direction: column; height: 100%; padding: 26px; border-radius: 16px; text-decoration: none;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09);
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        }
        .horg-card:hover { transform: translateY(-3px); border-color: rgba(216,249,80,0.35); box-shadow: 0 20px 48px rgba(4,22,53,0.26); }
        .horg-icon { width: 42px; height: 42px; border-radius: 12px; background: rgba(216,249,80,0.13); border: 1px solid rgba(216,249,80,0.22); display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
        .horg-link { display: inline-flex; align-items: center; gap: 5px; margin-top: 20px; font-size: 13px; font-weight: 700; font-family: var(--font-body); color: #D8F950; }
        .horg-card:hover .horg-link svg { transform: translateX(3px); }
        .horg-link svg { transition: transform 0.22s ease; }
      `}</style>

      <div className="horg-inner">
        <motion.div className="horg-head" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>For organizations</p>
          <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, color: '#fff', lineHeight: 0.96, letterSpacing: '-0.03em', marginBottom: '20px' }}>
            See the person, not just the paper.
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            Whether you&apos;re hiring, placing candidates, or preparing students for the job market, Reslink gives you video and data a resume never could.
          </p>
        </motion.div>

        <div className="horg-cards">
          {items.map((item, i) => (
            <motion.div key={item.href} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ delay: i * 0.07 }}>
              <Link href={item.href} className="horg-card">
                <div className="horg-icon"><item.icon size={19} color="#D8F950" strokeWidth={1.9} /></div>
                <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '20px', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '9px', color: '#fff' }}>{item.label}</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.65, fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.55)', flex: 1 }}>{item.desc}</p>
                <span className="horg-link">Learn more <ArrowRight size={13} /></span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
