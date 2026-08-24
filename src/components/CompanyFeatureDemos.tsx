'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Three live demos for the companies-page feature catalog — Team
 * Collaboration, Pipeline and Lists, Job Board — built the same way as
 * AIScreeningDemo (real HTML/CSS, no screenshot), replacing the static
 * marketing screenshots those tabs used to show. */

/* ── Team Collaboration ── */
const COLLAB_NOTES = [
  { initials: 'JP', color: '#7C3AED', name: 'James Park', note: 'Impressive — component library is legit.' },
  { initials: 'RT', color: '#0C63E3', name: 'Rosa Tran', note: 'Strong async communication in the video.' },
  { initials: 'YO', color: '#D97706', name: 'You', note: 'Agreed, moving to Final Round.' },
];

export function CollabDemo() {
  const [visibleNotes, setVisibleNotes] = useState(1);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const runCycle = () => {
      setVisibleNotes(1);
      setStars(0);
      timers.push(setTimeout(() => { if (!cancelled) setVisibleNotes(2); }, 1400));
      timers.push(setTimeout(() => { if (!cancelled) setVisibleNotes(3); }, 2800));
      let s = 0;
      const addStar = () => {
        if (cancelled) return;
        s++;
        setStars(s);
        if (s < 4) timers.push(setTimeout(addStar, 220));
      };
      timers.push(setTimeout(addStar, 3600));
      timers.push(setTimeout(runCycle, 6800));
    };
    runCycle();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, []);

  return (
    <div style={{ background: '#F7F8FA', padding: 'clamp(16px, 2.5vw, 28px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', background: '#fff', borderRadius: '12px', border: '1px solid #E8EAF0', padding: '14px 16px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#4F6EF7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>EC</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Eleanor Chu</p>
          <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Senior Product Designer</p>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)', background: '#16A34A', borderRadius: '6px', padding: '3px 9px' }}>A+</span>
      </div>

      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>Team notes</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
        <AnimatePresence initial={false}>
          {COLLAB_NOTES.slice(0, visibleNotes).map(n => (
            <motion.div key={n.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#fff', borderRadius: '10px', border: '1px solid #E8EAF0', padding: '10px 12px' }}>
              <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: n.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{n.initials}</span>
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>{n.name}</p>
                <p style={{ fontSize: '12px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.4 }}>{n.note}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', borderRadius: '10px', border: '1px solid #E8EAF0', padding: '10px 14px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#3A3F4C', fontFamily: 'var(--font-body)' }}>Your rating</span>
        <div style={{ display: 'flex', gap: '2px' }}>
          {[1, 2, 3, 4].map(s => (
            <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= stars ? '#F59E0B' : '#E5E7EB'} stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Pipeline and Lists ── */
const PIPELINE_COLUMNS = [
  { id: 'final', label: 'Final Round', color: '#16A34A' },
  { id: 'maybe', label: 'Strong Maybes', color: '#D97706' },
  { id: 'warm', label: 'Keep Warm', color: '#9A9FA8' },
];
const PIPELINE_CANDIDATES = [
  { name: 'Eleanor Chu', initials: 'EC', color: '#4F6EF7', grade: 'A+', gradeColor: '#16A34A', col: 'final' },
  { name: 'Marcus Lee', initials: 'ML', color: '#EF4444', grade: 'A', gradeColor: '#16A34A', col: 'final' },
  { name: 'Priya Nair', initials: 'PN', color: '#10B981', grade: 'B+', gradeColor: '#0C63E3', col: 'maybe', movesTo: 'final' },
  { name: 'Dev Okafor', initials: 'DO', color: '#F59E0B', grade: 'B', gradeColor: '#D97706', col: 'warm' },
];

export function PipelineDemo() {
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const runCycle = () => {
      setMoved(false);
      timers.push(setTimeout(() => { if (!cancelled) setMoved(true); }, 2600));
      timers.push(setTimeout(runCycle, 6200));
    };
    runCycle();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, []);

  return (
    <div style={{ background: '#F7F8FA', padding: 'clamp(16px, 2.5vw, 28px)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {PIPELINE_COLUMNS.map(col => {
          const cards = PIPELINE_CANDIDATES.filter(c => (moved && c.movesTo ? c.movesTo : c.col) === col.id);
          return (
            <div key={col.id} style={{ background: '#fff', borderRadius: '10px', border: '1px solid #E8EAF0', padding: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: col.color, flexShrink: 0 }} />
                <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>{col.label}</span>
                <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{cards.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', minHeight: '110px' }}>
                <AnimatePresence>
                  {cards.map(c => (
                    <motion.div key={c.name} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '7px', background: '#F7F8FA', borderRadius: '8px', padding: '7px 8px' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: '8.5px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{c.initials}</span>
                      </div>
                      <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)', flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
                      <span style={{ fontSize: '9px', fontWeight: 800, color: '#fff', background: c.gradeColor, borderRadius: '4px', padding: '1.5px 5px', flexShrink: 0 }}>{c.grade}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Job Board ── */
const BOARD_ROLES = [
  { title: 'Senior Product Designer', applicants: 24 },
  { title: 'Backend Engineer', applicants: 41 },
  { title: 'Marketing Intern', applicants: 12 },
];
const BOARD_APPLICANTS = ['Zara Mitchell', 'Theo Brandt', 'Nadia Osei'];

export function JobBoardDemo() {
  const [applicantIndex, setApplicantIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [counts, setCounts] = useState(BOARD_ROLES.map(r => r.applicants));

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const runCycle = () => {
      timers.push(setTimeout(() => {
        if (cancelled) return;
        setShowToast(true);
        setCounts(c => c.map((v, i) => i === 2 ? v + 1 : v));
        timers.push(setTimeout(() => { if (!cancelled) setShowToast(false); }, 2200));
        timers.push(setTimeout(() => { if (!cancelled) setApplicantIndex(i => (i + 1) % BOARD_APPLICANTS.length); }, 2500));
      }, 500));
      timers.push(setTimeout(runCycle, 4200));
    };
    runCycle();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, []);

  return (
    <div style={{ background: '#F7F8FA', padding: 'clamp(16px, 2.5vw, 28px)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#041635', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D8F950" strokeWidth="2"><path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9 22 2z"/></svg>
        </div>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>reslink.io/company/yourname</p>
          <p style={{ fontSize: '10.5px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>3 open roles · public board</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '14px' }}>
        {BOARD_ROLES.map((r, i) => (
          <div key={r.title} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', borderRadius: '10px', border: '1px solid #E8EAF0', padding: '10px 14px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)' }}>{r.title}</span>
            <motion.span key={counts[i]} initial={{ scale: 1.3, color: '#16A34A' }} animate={{ scale: 1, color: '#9A9FA8' }} transition={{ duration: 0.5 }} style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'var(--font-body)' }}>{counts[i]} applicants</motion.span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '10px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Synced to</span>
        {['LinkedIn', 'Indeed', 'ZipRecruiter'].map(s => (
          <span key={s} style={{ fontSize: '9.5px', fontWeight: 600, color: '#3A3F4C', background: '#fff', border: '1px solid #E8EAF0', borderRadius: '100px', padding: '3px 9px', fontFamily: 'var(--font-body)' }}>{s}</span>
        ))}
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }} transition={{ duration: 0.3 }}
            style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', borderRadius: '10px', border: '1px solid #E8EAF0', boxShadow: '0 8px 24px rgba(4,22,53,0.12)', padding: '9px 12px' }}>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16A34A', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>New application</p>
              <p style={{ fontSize: '10px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{BOARD_APPLICANTS[applicantIndex]} · with video pitch</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
