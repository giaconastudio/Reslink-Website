'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Briefcase, GraduationCap, Flag, Building2, Users } from 'lucide-react';

const individuals = [
  { label: 'Job Seekers', href: '/job-seekers', desc: 'Stand out in a stack of identical resumes with a 60-second video pitch.', icon: Briefcase },
  { label: 'Students', href: '/students', desc: 'Land your first role or internship without years of experience to lean on.', icon: GraduationCap },
  { label: 'Veterans', href: '/veterans', desc: 'Translate military experience into language civilian recruiters understand.', icon: Flag },
];

const organizations = [
  { label: 'Companies', href: '/companies', desc: 'Screen more candidates in less time and see who is genuinely a fit.', icon: Building2 },
  { label: 'Recruitment Agencies', href: '/agencies', desc: 'Send clients branded video shortlists and win briefs on real engagement data.', icon: Users },
  { label: 'Universities', href: '/universities', desc: 'Give every student a video pitch and prove your placement outcomes.', icon: GraduationCap },
];

function AudienceCard({ item, dark, delay }: {
  item: { label: string; href: string; desc: string; icon: React.ElementType };
  dark: boolean;
  delay: number;
}) {
  const Icon = item.icon;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ delay, duration: 0.4 }}>
      <Link href={item.href} className={`ha-card ${dark ? 'ha-card-dark' : 'ha-card-light'}`}>
        <div className="ha-icon">
          <Icon size={19} color={dark ? '#D8F950' : '#0C63E3'} strokeWidth={1.9} />
        </div>
        <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '20px', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '9px', color: dark ? '#fff' : '#041635' }}>
          {item.label}
        </h3>
        <p style={{ fontSize: '14px', lineHeight: 1.65, fontFamily: 'var(--font-body)', color: dark ? 'rgba(255,255,255,0.55)' : '#5C6070', flex: 1 }}>
          {item.desc}
        </p>
        <span className="ha-link" style={{ color: dark ? '#D8F950' : '#0C63E3' }}>
          Learn more <ArrowRight size={13} />
        </span>
      </Link>
    </motion.div>
  );
}

export default function HomeAudiences() {
  return (
    <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
      <style>{`
        .ha-inner { max-width: 1080px; margin: 0 auto; }
        .ha-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        @media (max-width: 860px) { .ha-grid { grid-template-columns: 1fr; } }
        .ha-card {
          display: flex; flex-direction: column; height: 100%;
          padding: 26px; border-radius: 16px; text-decoration: none;
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        }
        .ha-card:hover { transform: translateY(-3px); }
        .ha-card-light { background: #fff; border: 1px solid #E8EAF0; box-shadow: 0 1px 8px rgba(4,22,53,0.04); }
        .ha-card-light:hover { border-color: #0C63E3; box-shadow: 0 16px 40px rgba(4,22,53,0.10); }
        .ha-card-light .ha-icon { background: #EEF4FF; }
        .ha-card-dark { background: #041635; border: 1px solid rgba(255,255,255,0.09); box-shadow: 0 4px 18px rgba(4,22,53,0.16); }
        .ha-card-dark:hover { box-shadow: 0 20px 48px rgba(4,22,53,0.26); border-color: rgba(216,249,80,0.35); }
        .ha-card-dark .ha-icon { background: rgba(216,249,80,0.13); border: 1px solid rgba(216,249,80,0.22); }
        .ha-icon {
          width: 42px; height: 42px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center; margin-bottom: 18px;
        }
        .ha-link {
          display: inline-flex; align-items: center; gap: 5px;
          margin-top: 20px; font-size: 13px; font-weight: 700; font-family: var(--font-body);
        }
        .ha-card:hover .ha-link svg { transform: translateX(3px); }
        .ha-link svg { transition: transform 0.22s ease; }
        .ha-group-head { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 22px; }
      `}</style>

      <div className="ha-inner">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto clamp(48px, 6vw, 68px)' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Who it&apos;s for</p>
          <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '20px' }}>
            One platform.<br />Both sides of the table.
          </h2>
          <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            Candidates get seen for who they actually are. Hiring teams get the context a resume could never give them.
          </p>
        </motion.div>

        {/* For individuals */}
        <div style={{ marginBottom: 'clamp(44px, 5vw, 64px)' }}>
          <motion.div className="ha-group-head" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }}>
            <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(22px, 2.4vw, 28px)', fontWeight: 900, color: '#041635', letterSpacing: '-0.02em' }}>For individuals</h3>
            <p style={{ fontSize: '14px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Free forever · No credit card</p>
          </motion.div>
          <div className="ha-grid">
            {individuals.map((item, i) => (
              <AudienceCard key={item.href} item={item} dark={false} delay={i * 0.07} />
            ))}
          </div>
        </div>

        {/* For organizations */}
        <div>
          <motion.div className="ha-group-head" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }}>
            <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(22px, 2.4vw, 28px)', fontWeight: 900, color: '#041635', letterSpacing: '-0.02em' }}>For organizations</h3>
            <p style={{ fontSize: '14px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Book a demo · Set up in days</p>
          </motion.div>
          <div className="ha-grid">
            {organizations.map((item, i) => (
              <AudienceCard key={item.href} item={item} dark delay={i * 0.07} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
