'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* Three live demos for the companies-page feature catalog — Team
 * Collaboration, Pipeline and Lists, Job Board — built the same way as
 * AIScreeningDemo (real HTML/CSS, no screenshot), modeled on the actual
 * product screens rather than the generic mockups this used to show. */

/* ── Team Collaboration: resume + AI score + live team notes ── */
const COLLAB_TEAM = [
  { initials: 'JP', color: '#7C3AED', name: 'James Park' },
  { initials: 'RT', color: '#0C63E3', name: 'Rosa Tran' },
  { initials: 'YO', color: '#D97706', name: 'You' },
];
const COLLAB_NOTES = [
  { who: 0, text: 'Strong GitHub activity. Review his project links before next step.' },
  { who: 1, text: 'Agreed — communicates clearly on video too.' },
  { who: 2, text: 'mentionRosa can you confirm his notice period?' },
];

export function CollabDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typingWho, setTypingWho] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const after = (ms: number, fn: () => void) => timers.push(setTimeout(() => { if (!cancelled) fn(); }, ms));

    const runCycle = () => {
      setVisibleCount(0);
      setTypingWho(null);
      let t = 700;
      COLLAB_NOTES.forEach((n, i) => {
        after(t, () => setTypingWho(n.who));
        t += 800;
        after(t, () => { setTypingWho(null); setVisibleCount(i + 1); });
        t += 700;
      });
      after(t + 2600, runCycle);
    };
    runCycle();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [inView]);

  return (
    <div ref={rootRef} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1px', background: '#E8EAF0', maxHeight: '460px' }}>
      {/* Resume */}
      <div style={{ background: '#fff', padding: 'clamp(16px, 2.4vw, 26px)', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: '14px' }}>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: '17px', fontWeight: 700, color: '#111827' }}>Liam Castillo</p>
          <p style={{ fontSize: '10px', color: '#6B7280', fontFamily: 'var(--font-body)', marginTop: '3px' }}>Austin, TX · 512-555-0244 · liam.castillo@gmail.com</p>
        </div>
        <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#111827', fontFamily: 'var(--font-body)', marginBottom: '8px', borderBottom: '1px solid #E5E7EB', paddingBottom: '4px' }}>Professional Experience</p>
        <div style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#111827', fontFamily: 'var(--font-body)' }}>Backend Engineer II · Notion</span>
            <span style={{ fontSize: '9.5px', color: '#9CA3AF', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>Jan 2024 – Present</span>
          </div>
          <p style={{ fontSize: '10px', color: '#0C63E3', fontFamily: 'var(--font-body)', margin: '2px 0 5px' }}>San Francisco, CA</p>
          <ul style={{ listStyle: 'disc', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <li style={{ fontSize: '10px', color: '#374151', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>Built real-time sync engine serving 10M+ daily active users</li>
            <li style={{ fontSize: '10px', color: '#374151', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>Shipped Block Storage API, cutting read latency 55%</li>
          </ul>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#111827', fontFamily: 'var(--font-body)' }}>Software Engineer · Twilio</span>
            <span style={{ fontSize: '9.5px', color: '#9CA3AF', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>Jul 2022 – Dec 2023</span>
          </div>
          <p style={{ fontSize: '10px', color: '#0C63E3', fontFamily: 'var(--font-body)', margin: '2px 0 5px' }}>Remote</p>
          <ul style={{ listStyle: 'disc', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <li style={{ fontSize: '10px', color: '#374151', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>Led incident response on 3 P0 outages, cutting MTTR 45→12 min</li>
          </ul>
        </div>
        <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#111827', fontFamily: 'var(--font-body)', marginBottom: '7px', borderBottom: '1px solid #E5E7EB', paddingBottom: '4px' }}>Skills</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {['Node.js', 'TypeScript', 'PostgreSQL', 'AWS Lambda', 'Redis'].map(s => (
            <span key={s} style={{ fontSize: '9.5px', color: '#374151', background: '#F3F4F6', borderRadius: '5px', padding: '3px 8px', fontFamily: 'var(--font-body)' }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Sidebar — AI score + team notes */}
      <div style={{ background: '#F7F8FA', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>
        <div style={{ background: '#fff', borderRadius: '10px', border: '1px solid #E8EAF0', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '7px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#7C3AED"><path d="M12 1.5 L13.2 9.8 L21.5 12 L13.2 14.2 L12 22.5 L10.8 14.2 L2.5 12 L10.8 9.8 Z"/></svg>
          <span style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6B7280', fontFamily: 'var(--font-body)' }}>Reslink AI</span>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '9px', fontWeight: 900, color: '#fff', background: '#16A34A', borderRadius: '5px', padding: '2px 6px' }}>A</span>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#041635', fontFamily: 'var(--font-phudu)' }}>94/100</span>
          </span>
        </div>

        <div style={{ background: '#fff', borderRadius: '10px', border: '1px solid #E8EAF0', padding: '12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>Team Notes</span>
            <span style={{ fontSize: '9.5px', fontWeight: 700, color: '#0C63E3', background: '#EEF4FF', borderRadius: '100px', padding: '1px 7px' }}>{visibleCount}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <AnimatePresence initial={false}>
              {COLLAB_NOTES.slice(0, visibleCount).map(n => {
                const author = COLLAB_TEAM[n.who];
                const [before, mention, after] = n.text.includes('mention') ? n.text.split(/mention(\w+ \w+)/) : [n.text, null, ''];
                return (
                  <motion.div key={n.text} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: author.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '8.5px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{author.initials}</span>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: '10.5px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>{author.name}</p>
                      <p style={{ fontSize: '10.5px', color: '#3A3F4C', fontFamily: 'var(--font-body)', lineHeight: 1.4 }}>
                        {before}
                        {mention && <span style={{ color: '#0C63E3', fontWeight: 700 }}>@{mention}</span>}
                        {after}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {typingWho !== null && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: COLLAB_TEAM[typingWho].color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '8.5px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{COLLAB_TEAM[typingWho].initials}</span>
                </div>
                <div style={{ display: 'flex', gap: '3px', background: '#F1F3F5', borderRadius: '100px', padding: '6px 10px' }}>
                  {[0, 1, 2].map(d => (
                    <motion.span key={d} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.9, delay: d * 0.15 }} style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#9AA1AE', display: 'inline-block' }} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div style={{ border: '1px solid #E4E7EC', borderRadius: '8px', padding: '8px 10px', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '10px', color: '#B0B4BE', fontFamily: 'var(--font-body)' }}>Add a note for your team…</span>
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#fff', background: '#9AA1AE', borderRadius: '5px', padding: '3px 8px', fontFamily: 'var(--font-body)' }}>Post</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Pipeline and Lists: saved lists, one expanded at a time on a loop ── */
const PIPELINE_LISTS = [
  { id: 'final', label: 'Final Round', color: '#16A34A', count: 5, candidates: [
    { name: 'Xintong Zhang', role: 'Marketing Intern', initials: 'XZ', color: '#EF4444', grade: 'A', gradeColor: '#16A34A' },
    { name: 'Liam Castillo', role: 'Backend Software Engineer', initials: 'LC', color: '#4F6EF7', grade: 'A', gradeColor: '#16A34A' },
    { name: 'Eleanor Chu', role: 'Senior Product Designer', initials: 'EC', color: '#10B981', grade: 'A+', gradeColor: '#16A34A' },
  ] },
  { id: 'maybe', label: 'Strong Maybes', color: '#0C63E3', count: 6, candidates: [
    { name: 'Priya Nair', role: 'Data Analyst', initials: 'PN', color: '#F59E0B', grade: 'B+', gradeColor: '#0C63E3' },
    { name: 'Marcus Lee', role: 'Sales Development Rep', initials: 'ML', color: '#EF4444', grade: 'A', gradeColor: '#16A34A' },
  ] },
  { id: 'warm', label: 'Keep Warm', color: '#D97706', count: 4, candidates: [
    { name: 'Dev Okafor', role: 'Customer Success Manager', initials: 'DO', color: '#7C3AED', grade: 'B', gradeColor: '#D97706' },
  ] },
];

export function PipelineDemo() {
  const [expandedId, setExpandedId] = useState('final');
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % PIPELINE_LISTS.length;
      setExpandedId(PIPELINE_LISTS[i].id);
    }, 2600);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={rootRef} style={{ background: '#F7F8FA', padding: 'clamp(16px, 2.5vw, 26px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '15px', fontWeight: 900, color: '#041635', letterSpacing: '-0.01em' }}>SAVED LISTS</p>
          <p style={{ fontSize: '10px', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginTop: '2px' }}>Organize candidates into custom shortlists</p>
        </div>
        <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', background: '#041635', borderRadius: '7px', padding: '6px 10px', fontFamily: 'var(--font-body)' }}>+ New List</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
        {[{ v: 3, l: 'Lists' }, { v: 15, l: 'Candidates Saved' }, { v: 8, l: 'Grade A' }].map(s => (
          <div key={s.l} style={{ background: '#fff', border: '1px solid #E8EAF0', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
            <p style={{ fontSize: '17px', fontWeight: 900, color: '#041635', fontFamily: 'var(--font-phudu)' }}>{s.v}</p>
            <p style={{ fontSize: '8.5px', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginTop: '2px' }}>{s.l}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        {PIPELINE_LISTS.map(list => {
          const isExpanded = expandedId === list.id;
          return (
            <motion.div key={list.id} layout transition={{ layout: { duration: 0.4, ease: 'easeInOut' } }} style={{ background: '#fff', border: '1px solid #E8EAF0', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '11px 13px', cursor: 'pointer' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: list.color, flexShrink: 0 }} />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>{list.label}</span>
                <span style={{ fontSize: '9.5px', fontWeight: 700, color: list.color, background: `${list.color}18`, borderRadius: '100px', padding: '2px 8px' }}>{list.count} candidates</span>
                <motion.svg animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9AA1AE" strokeWidth="2.5" style={{ marginLeft: 'auto' }}>
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </div>
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '0 13px 11px' }}>
                      {list.candidates.map(c => (
                        <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F7F8FA', borderRadius: '8px', padding: '7px 9px' }}>
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ fontSize: '9px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{c.initials}</span>
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: '11px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</p>
                            <p style={{ fontSize: '9.5px', color: '#9AA1AE', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.role}</p>
                          </div>
                          <span style={{ fontSize: '9px', fontWeight: 800, color: '#fff', background: c.gradeColor, borderRadius: '5px', padding: '2px 6px', flexShrink: 0 }}>{c.grade}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Job Board: fictitious example company (not a real business — avoids
   implying a real brand is a Reslink customer), auto-scrolling top to
   bottom to show the branded hero, then the open-roles list. ── */
const BOARD_ROLES = [
  { title: 'Marketing Intern', type: 'Internship', typeColor: '#7C3AED', pay: '$20/hr', tags: ['Remote', 'Video'], applicants: 6 },
  { title: 'Backend Software Engineer', type: 'Full-time', typeColor: '#16A34A', pay: '$95,000 – $120,000', tags: ['Video'], applicants: 5 },
  { title: 'Senior Product Designer', type: 'Full-time', typeColor: '#16A34A', pay: '$110,000 – $135,000', tags: ['Remote', 'Video'], applicants: 4 },
  { title: 'Account Executive', type: 'Full-time', typeColor: '#16A34A', pay: '$70,000 base + commission', tags: [], applicants: 4 },
];

export function JobBoardDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];
    const easeInOutCubic = (p: number) => p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    const slowScrollTo = (target: number, duration: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const start = el.scrollTop;
      const distance = target - start;
      const startTime = Date.now();
      const interval = setInterval(() => {
        if (cancelled) { clearInterval(interval); return; }
        const p = Math.min(1, (Date.now() - startTime) / duration);
        el.scrollTop = start + distance * easeInOutCubic(p);
        if (p >= 1) clearInterval(interval);
      }, 16);
      intervals.push(interval);
    };
    const runCycle = () => {
      scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
      timers.push(setTimeout(() => {
        if (scrollRef.current) slowScrollTo(scrollRef.current.scrollHeight, 3200);
      }, 1600));
      timers.push(setTimeout(runCycle, 1600 + 3200 + 2400));
    };
    runCycle();
    return () => { cancelled = true; timers.forEach(clearTimeout); intervals.forEach(clearInterval); };
  }, [inView]);

  return (
    <div ref={rootRef} style={{ maxHeight: '460px', overflow: 'hidden' }}>
      <div ref={scrollRef} style={{ overflowY: 'hidden' }}>
        {/* Branded hero — a fictitious example company */}
        <div style={{ background: 'linear-gradient(135deg, #4338CA 0%, #6D28D9 100%)', padding: '18px 20px 22px' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4338CA" strokeWidth="2.5"><path d="M12 2 L2 7 L12 12 L22 7 Z"/><path d="M2 17 L12 22 L22 17"/><path d="M2 12 L12 17 L22 12"/></svg>
          </div>
          <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '17px', fontWeight: 900, color: '#fff', letterSpacing: '-0.01em' }}>NOVA ROBOTICS</p>
          <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
            <span style={{ fontSize: '9.5px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.14)', borderRadius: '100px', padding: '3px 9px' }}>Hardware Company</span>
            <span style={{ fontSize: '9.5px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.14)', borderRadius: '100px', padding: '3px 9px' }}>Austin, TX</span>
          </div>
          <p style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)', lineHeight: 1.55, marginTop: '12px', maxWidth: '75%' }}>
            We build the sensors and control systems behind next-generation warehouse robotics. Small team, real ownership.
          </p>
          <div style={{ marginTop: '14px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)', aspectRatio: '16/7', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#4338CA"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span style={{ position: 'absolute', bottom: '8px', left: '10px', fontSize: '9.5px', color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)' }}>Meet the team</span>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '15px', fontWeight: 900, color: '#fff' }}>4</p>
              <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}>Open Roles</p>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '15px', fontWeight: 900, color: '#fff' }}>19</p>
              <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}>Applicants</p>
            </div>
          </div>
        </div>

        {/* Open roles */}
        <div style={{ background: '#F7F8FA', padding: '16px 18px' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>4 open roles</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {BOARD_ROLES.map((r, i) => (
              <div key={r.title} style={{ background: '#fff', borderRadius: '10px', border: i === 0 ? '1.5px solid #4338CA' : '1px solid #E8EAF0', padding: '11px 13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '5px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>{r.title}</span>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: r.typeColor, background: `${r.typeColor}18`, borderRadius: '100px', padding: '2px 8px', flexShrink: 0 }}>{r.type}</span>
                </div>
                <p style={{ fontSize: '10.5px', color: '#6B7280', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>{r.pay}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  {r.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '9px', fontWeight: 600, color: '#4338CA', background: '#EEF2FF', borderRadius: '100px', padding: '2px 8px' }}>{tag}</span>
                  ))}
                  <span style={{ marginLeft: 'auto', fontSize: '9.5px', color: '#9AA1AE', fontFamily: 'var(--font-body)' }}>{r.applicants} applicants</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
