'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Live AI Screening demo — real HTML, rows re-sort as scores arrive.
 * Shared between the companies page and the homepage. */
const AI_CANDIDATES = [
  { name: 'Zara Mitchell', role: 'Frontend Engineer Intern', initials: 'ZM', color: '#4F6EF7', score: 91, grade: 'A', gradeColor: '#16A34A' },
  { name: 'Ben Holloway', role: 'Frontend Engineer Intern', initials: 'BH', color: '#10B981', score: 84, grade: 'B+', gradeColor: '#0C63E3' },
  { name: 'Aaliya Hassan', role: 'Frontend Engineer Intern', initials: 'AH', color: '#F59E0B', score: 79, grade: 'B+', gradeColor: '#0C63E3' },
  { name: 'Liam Castillo', role: 'Frontend Engineer Intern', initials: 'LC', color: '#7C3AED', score: 94, grade: 'A', gradeColor: '#16A34A' },
  { name: 'Naomi Whitfield', role: 'Frontend Engineer Intern', initials: 'NW', color: '#E11D48', score: 72, grade: 'B', gradeColor: '#D97706' },
];

export default function AIScreeningDemo() {
  const [scoredCount, setScoredCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setScoredCount(s => (s >= AI_CANDIDATES.length ? 0 : s + 1));
    }, 1700);
    return () => clearInterval(id);
  }, []);

  const rows = AI_CANDIDATES.map((c, i) => ({ ...c, isScored: i < scoredCount }));
  rows.sort((a, b) => (b.isScored ? b.score : -1) - (a.isScored ? a.score : -1));

  return (
    <div style={{ background: '#F7F8FA', padding: 'clamp(16px, 2.5vw, 28px)' }}>
      {/* Panel header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <p style={{ fontSize: '15px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Frontend Engineer Intern</p>
          <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '2px' }}>{AI_CANDIDATES.length} applicants · sorted by AI rank</p>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#041635', borderRadius: '100px', padding: '6px 14px' }}>
          <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#D8F950', display: 'inline-block' }} />
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)' }}>
            {scoredCount < AI_CANDIDATES.length ? 'Reslink AI scoring…' : 'All applicants scored'}
          </span>
        </div>
      </div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {rows.map((c, rank) => (
          <motion.div key={c.name} layout transition={{ type: 'spring', stiffness: 350, damping: 32 }}
            style={{ background: '#fff', borderRadius: '12px', border: c.isScored && rank === 0 ? '1.5px solid #D8F950' : '1px solid #E8EAF0', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: c.isScored && rank === 0 ? '0 4px 20px rgba(216,249,80,0.25)' : '0 1px 4px rgba(4,22,53,0.04)' }}>
            <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '14px', fontWeight: 900, color: c.isScored ? '#041635' : '#C3C8D2', width: '18px', flexShrink: 0 }}>{c.isScored ? rank + 1 : '·'}</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '12px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{c.initials}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</p>
              <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.role}</p>
            </div>
            <AnimatePresence mode="wait">
              {c.isScored ? (
                <motion.div key="scored" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }} style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  <div className="ai-demo-bar" style={{ width: '86px', height: '5px', borderRadius: '3px', background: '#EEF0F4', overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${c.score}%` }} transition={{ duration: 0.7, ease: 'easeOut' }} style={{ height: '100%', borderRadius: '3px', background: c.gradeColor }} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)', background: c.gradeColor, borderRadius: '6px', padding: '3px 8px', minWidth: '30px', textAlign: 'center' }}>{c.grade}</span>
                  <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '15px', fontWeight: 900, color: '#041635', width: '26px', textAlign: 'right' }}>{c.score}</span>
                </motion.div>
              ) : (
                <motion.div key="pending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '7px', flexShrink: 0 }}>
                  <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2 }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#0C63E3', display: 'inline-block' }} />
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Analyzing…</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <style>{`@media (max-width: 560px) { .ai-demo-bar { display: none !important; } }`}</style>
    </div>
  );
}
