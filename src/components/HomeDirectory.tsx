'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Briefcase, GraduationCap, Flag, Building2, Users } from 'lucide-react';

const individualPaths = [
  { label: 'Job Seekers', href: '/job-seekers', icon: Briefcase },
  { label: 'Students', href: '/students', icon: GraduationCap },
  { label: 'Veterans', href: '/veterans', icon: Flag },
];

const organizationPaths = [
  { label: 'Companies', href: '/companies', icon: Building2 },
  { label: 'Recruitment Agencies', href: '/agencies', icon: Users },
  { label: 'Universities', href: '/universities', icon: GraduationCap },
];

function PathCell({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <Link href={href} className="hd-cell">
      <span className="hd-cell-icon"><Icon size={16} color="#0C63E3" strokeWidth={1.9} /></span>
      <span className="hd-cell-label">{label}</span>
      <ArrowRight size={15} className="hd-cell-arrow" />
    </Link>
  );
}

/** Compact, calm directory — the only place on the homepage that asks a
 *  visitor to choose a side. One table, six links, straight to the real
 *  pages. No videos, no cards, no competing visuals. */
export default function HomeDirectory() {
  return (
    <section id="directory" style={{ background: '#F7F8FA', padding: 'clamp(64px, 8vw, 96px) 24px', scrollMarginTop: '84px' }}>
      <style>{`
        .hd-wrap { max-width: 820px; margin: 0 auto; }
        .hd-eyebrow { text-align: center; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #0C63E3; font-family: var(--font-body); margin-bottom: 12px; }
        .hd-head { text-align: center; font-family: var(--font-phudu); font-size: clamp(28px, 3.6vw, 40px); font-weight: 900; color: #041635; letter-spacing: -0.02em; margin-bottom: 40px; }
        .hd-table {
          display: grid; grid-template-columns: 1fr 1fr;
          border-radius: 20px; border: 1px solid #E4E6EC; overflow: hidden;
          box-shadow: 0 4px 24px rgba(4,22,53,0.06); background: #fff;
        }
        .hd-table-header {
          padding: 16px 24px; background: #041635; border-bottom: 1px solid rgba(255,255,255,0.1);
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.09em;
          color: rgba(255,255,255,0.85); font-family: var(--font-body);
        }
        .hd-table-header:nth-child(1) { border-right: 1px solid rgba(255,255,255,0.1); }
        .hd-cell {
          display: flex; align-items: center; gap: 11px; padding: 15px 24px;
          text-decoration: none; transition: background 0.15s ease;
          border-bottom: 1px solid #ECEEF1;
        }
        .hd-cell:nth-child(odd) { border-right: 1px solid #ECEEF1; }
        .hd-cell:hover { background: #F8FAFF; }
        .hd-cell:last-child, .hd-cell:nth-last-child(2) { border-bottom: none; }
        .hd-cell-icon { width: 30px; height: 30px; border-radius: 9px; background: #EEF4FF; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .hd-cell-label { flex: 1; font-size: 14px; font-weight: 700; color: #041635; font-family: var(--font-body); text-align: left; }
        .hd-cell-arrow { color: #C7CCD6; flex-shrink: 0; transition: transform 0.18s ease, color 0.18s ease; }
        .hd-cell:hover .hd-cell-arrow { color: #0C63E3; transform: translateX(3px); }

        @media (max-width: 640px) {
          .hd-table { grid-template-columns: 1fr; }
          .hd-table-header, .hd-cell { border-right: none !important; }
          .hd-table-header:nth-child(1) { order: 0; }
          .hd-cell:nth-child(3) { order: 1; }
          .hd-cell:nth-child(5) { order: 2; }
          .hd-cell:nth-child(7) { order: 3; }
          .hd-table-header:nth-child(2) { order: 4; }
          .hd-cell:nth-child(4) { order: 5; }
          .hd-cell:nth-child(6) { order: 6; }
          .hd-cell:nth-child(8) { order: 7; }
          .hd-cell:nth-last-child(2) { border-bottom: 1px solid #ECEEF1; }
          .hd-cell:last-child { border-bottom: none; }
        }
      `}</style>

      <div className="hd-wrap">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.4 }}>
          <p className="hd-eyebrow">Get started</p>
          <h2 className="hd-head">Pick where you fit.</h2>
        </motion.div>

        <motion.div className="hd-table" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.45, delay: 0.08 }}>
          <div className="hd-table-header">For individuals</div>
          <div className="hd-table-header">For organizations</div>
          {individualPaths.flatMap((ip, i) => [
            <PathCell key={ip.href} {...ip} />,
            <PathCell key={organizationPaths[i].href} {...organizationPaths[i]} />,
          ])}
        </motion.div>
      </div>
    </section>
  );
}
