'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Three live demos for the companies-page feature catalog — Team
 * Collaboration, Pipeline and Lists, Job Board — built the same way as
 * AIScreeningDemo (real HTML/CSS, no screenshot), modeled on the actual
 * product screens rather than the generic mockups this used to show.
 *
 * Each takes an `active` prop driven by the page's scrollspy (only the
 * feature block currently in view is "active") rather than gating on
 * their own useInView — all four cards are stacked and mounted at once,
 * so without a shared source of truth every demo just free-runs
 * regardless of which one the visitor is actually looking at. */

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

export function CollabDemo({ active }: { active: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typingWho, setTypingWho] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) {
      const t = setTimeout(() => { setVisibleCount(0); setTypingWho(null); }, 0);
      return () => clearTimeout(t);
    }
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
  }, [active]);

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

export function PipelineDemo({ active }: { active: boolean }) {
  const [expandedId, setExpandedId] = useState('final');
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) {
      const t = setTimeout(() => setExpandedId('final'), 0);
      return () => clearTimeout(t);
    }
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % PIPELINE_LISTS.length;
      setExpandedId(PIPELINE_LISTS[i].id);
    }, 1700);
    return () => clearInterval(id);
  }, [active]);

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

/* ── Job Board: matches the real Reslink job board layout (branded hero
   with company info + Website/LinkedIn links + video placeholder + stats,
   then a search/filter row and a two-column role list + detail panel) for
   a fictitious example company — using a real brand's name/logo here
   would read as claiming they're a Reslink customer, which isn't true, so
   this invents one instead (same convention as this site's other example
   personas). Auto-scrolls top to bottom through the whole page and loops. ── */
const BOARD_ROLES = [
  {
    title: 'Field Robotics Intern', dept: 'Engineering', type: 'Internship', typeColor: '#2F5FE0', location: 'Remote', pay: '$24/hr', tags: ['Remote', 'Video'], applicants: 7,
    detail: {
      pills: ['Internship', 'Remote', 'Video Required'],
      responsibilities: ['Support field testing of new sensor rigs on live warehouse floors', 'Log and triage hardware issues with the firmware team'],
      skills: ['Python', 'ROS', 'Soldering'],
      benefits: ['Fully remote with flexible hours', 'Direct mentorship from the founding team'],
      about: 'Warehouse robotics is a physical problem, not just a software one. We’re looking for someone who wants hands-on time with real hardware, not just a simulator.',
    },
  },
  { title: 'Embedded Systems Engineer', dept: 'Engineering', type: 'Full-time', typeColor: '#16A34A', location: 'Austin, TX', pay: '$115,000 – $145,000', tags: ['Video'], applicants: 9 },
  {
    title: 'Hardware QA Technician', dept: 'Operations', type: 'Full-time', typeColor: '#16A34A', location: 'Austin, TX', pay: '$62,000 – $78,000', tags: ['Video'], applicants: 5,
    detail: {
      pills: ['Full-time', 'On-site', 'Video Required'],
      responsibilities: ['Run inspection and burn-in tests on every sensor rig before it ships', 'Document defects and work with engineering to close out root causes'],
      skills: ['Test Equipment', 'GD&T', 'Excel'],
      benefits: ['Full health coverage from day one', 'Direct mentorship from the founding team'],
      about: 'Every unit that leaves our floor has been through this role’s hands first. We need someone meticulous who won’t wave through a rig that isn’t ready.',
    },
  },
  { title: 'Account Executive', dept: 'Sales', type: 'Full-time', typeColor: '#16A34A', location: 'Remote', pay: '$80,000 base + commission', tags: ['Remote'], applicants: 6 },
];
const BOARD_CATEGORIES = ['All Roles', 'Engineering', 'Operations', 'Sales'];
const SEARCH_TARGET = 'Hardware QA Technician';

export function JobBoardDemo({ active }: { active: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [applyPressed, setApplyPressed] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filtered, setFiltered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const visibleRoles = filtered ? BOARD_ROLES.filter(r => r.title === SEARCH_TARGET) : BOARD_ROLES;
  const selectedRole = BOARD_ROLES[selectedIndex];

  // Gated on the `active` prop (driven by the page's scrollspy) rather
  // than its own useInView — a self-measured useInView can sit
  // permanently unresolved if the card is already in the viewport at
  // mount with no scroll event to nudge it (the same class of issue
  // ScrollToTop.tsx works around elsewhere on this site), and separately
  // it doesn't know whether THIS is the card being looked at versus one
  // of the other three stacked on the same page.
  useEffect(() => {
    if (!active) {
      const t = setTimeout(() => {
        setApplyPressed(false);
        setSearchText('');
        setFiltered(false);
        setSelectedIndex(0);
        scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
      }, 0);
      return () => clearTimeout(t);
    }
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
    const typeSearch = (onDone: () => void) => {
      let i = 0;
      const interval = setInterval(() => {
        if (cancelled) { clearInterval(interval); return; }
        i += 1;
        setSearchText(SEARCH_TARGET.slice(0, i));
        if (i >= SEARCH_TARGET.length) { clearInterval(interval); onDone(); }
      }, 45);
      intervals.push(interval);
    };
    const runCycle = () => {
      scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
      setApplyPressed(false);
      setSearchText('');
      setFiltered(false);
      setSelectedIndex(0);

      // Short beat, then scroll down to the search bar / role list first —
      // typing the search only makes sense once that's on screen, and
      // sitting frozen at the hero before moving read as the card being
      // stuck.
      const tHold = 400;
      const scrollToSearchDuration = 1500;
      timers.push(setTimeout(() => {
        const el = scrollRef.current;
        const bar = searchBarRef.current;
        if (el && bar) slowScrollTo(bar.offsetTop - 16, scrollToSearchDuration);
      }, tHold));

      // Now that the search bar is in view, type the term and let it
      // filter down to that one role.
      const tTypeStart = tHold + scrollToSearchDuration + 300;
      const tTypeDone = tTypeStart + SEARCH_TARGET.length * 45 + 400;
      timers.push(setTimeout(() => typeSearch(() => {
        if (cancelled) return;
        setFiltered(true);
        setSelectedIndex(BOARD_ROLES.findIndex(r => r.title === SEARCH_TARGET));
      }), tTypeStart));

      // Then a quicker scroll through the rest of the board.
      const tScrollStart = tTypeDone + 400;
      const scrollDuration = 4200;
      timers.push(setTimeout(() => {
        if (scrollRef.current) slowScrollTo(scrollRef.current.scrollHeight, scrollDuration);
      }, tScrollStart));
      // Land on "Apply Now" and visibly press it — that's what triggers the
      // loop restart, instead of just sitting at the bottom for a while.
      const tApply = tScrollStart + scrollDuration + 400;
      timers.push(setTimeout(() => { if (!cancelled) setApplyPressed(true); }, tApply));
      timers.push(setTimeout(runCycle, tApply + 400));
    };
    runCycle();
    return () => { cancelled = true; timers.forEach(clearTimeout); intervals.forEach(clearInterval); };
  }, [active]);

  return (
    // scrollRef has to be the element that's actually height-constrained —
    // it was on an inner wrapper with no height of its own (so its
    // scrollHeight == its content height, meaning nothing to scroll)
    // while this outer div held the real max-height + overflow:hidden.
    // Scrolling a div with no overflow of its own does nothing.
    <div ref={scrollRef} style={{ maxHeight: '460px', overflow: 'hidden' }}>
      <div>
        {/* Cover band — a thin bright-blue strip above the panel, matching the real board */}
        <div style={{ height: '10px', background: 'linear-gradient(90deg, #0B1739 0%, #2F5FE0 100%)' }} />

        {/* Company info — a fictitious example company. One continuous
            dark-navy-to-bright-blue gradient, matching the real board
            (not flat black, not purple). */}
        <div style={{ background: 'linear-gradient(115deg, #0B1739 0%, #16266B 55%, #2F5FE0 130%)', padding: '18px 20px 20px', display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2F5FE0" strokeWidth="2.5"><path d="M12 2 L2 7 L12 12 L22 7 Z"/><path d="M2 17 L12 22 L22 17"/><path d="M2 12 L12 17 L22 12"/></svg>
            </div>
            <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '17px', fontWeight: 900, color: '#fff', letterSpacing: '-0.01em' }}>NOVA ROBOTICS</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '9px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '9.5px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.08)', borderRadius: '100px', padding: '4px 10px' }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                Hardware Company
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '9.5px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.08)', borderRadius: '100px', padding: '4px 10px' }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Austin, TX
              </span>
            </div>
            <div style={{ display: 'flex', gap: '7px', marginTop: '9px' }}>
              <span style={{ fontSize: '9.5px', fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.1)', borderRadius: '7px', padding: '5px 10px' }}>Website</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '9.5px', fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.1)', borderRadius: '7px', padding: '5px 10px' }}>
                LinkedIn <span style={{ width: '11px', height: '11px', borderRadius: '2px', background: '#0A66C2', display: 'inline-block' }} />
              </span>
            </div>

            <p style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', marginTop: '16px', marginBottom: '6px' }}>About the company</p>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
              We build the sensors and control systems behind next-generation warehouse robotics — a small team with real ownership over what ships.
            </p>
          </div>

          <div>
            <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.14)', position: 'relative', aspectRatio: '16/11', background: '#DCE3EE' }}>
              {/* Placeholder photo standing in for the intro video —
                  a stock shot rather than an empty icon, since a bare
                  glyph didn't read as "photo goes here" at this size. */}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/companies/job-board-video-placeholder.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 30%' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,23,57,0.45)' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#2F5FE0"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              <span style={{ position: 'absolute', bottom: '8px', left: '10px', fontSize: '9px', color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-body)' }}>Meet the Nova Robotics team</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9px', padding: '9px 10px' }}>
                <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '15px', fontWeight: 900, color: '#fff' }}>4</p>
                <p style={{ fontSize: '8.5px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}>Open Roles</p>
              </div>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9px', padding: '9px 10px' }}>
                <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '15px', fontWeight: 900, color: '#fff' }}>27</p>
                <p style={{ fontSize: '8.5px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}>Applicants</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search + filter row */}
        <div ref={searchBarRef} style={{ background: '#F7F8FA', padding: '14px 18px 0' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            <div style={{ flex: 1, fontSize: '10px', color: searchText ? '#041635' : '#9AA1AE', fontFamily: 'var(--font-body)', background: '#fff', border: searchText ? '1.5px solid #2F5FE0' : '1px solid #E4E7EC', borderRadius: '8px', padding: '8px 11px' }}>
              {searchText || 'Search roles, teams, locations…'}
              {searchText && searchText.length < SEARCH_TARGET.length && (
                <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }} style={{ display: 'inline-block', width: '1px', height: '10px', background: '#2F5FE0', marginLeft: '1px', verticalAlign: 'middle' }} />
              )}
            </div>
            <div style={{ fontSize: '10px', color: '#3A3F4C', fontFamily: 'var(--font-body)', background: '#fff', border: '1px solid #E4E7EC', borderRadius: '8px', padding: '8px 11px', whiteSpace: 'nowrap' }}>All job types ▾</div>
          </div>
          <div style={{ display: 'flex', gap: '6px', overflow: 'hidden' }}>
            {BOARD_CATEGORIES.map((cat, i) => (
              <span key={cat} style={{ fontSize: '9.5px', fontWeight: 700, color: i === 0 ? '#fff' : '#3A3F4C', background: i === 0 ? '#041635' : '#fff', border: i === 0 ? 'none' : '1px solid #E4E7EC', borderRadius: '100px', padding: '5px 11px', whiteSpace: 'nowrap' }}>{cat}</span>
            ))}
          </div>
        </div>

        {/* Two-column: role list + detail */}
        <div style={{ background: '#F7F8FA', padding: '14px 18px 18px', display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: '10px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {visibleRoles.map(r => {
              const i = BOARD_ROLES.indexOf(r);
              return (
              <div key={r.title} style={{ background: '#fff', borderRadius: '10px', border: i === selectedIndex ? '1.5px solid #2F5FE0' : '1px solid #E8EAF0', padding: '10px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.3 }}>{r.title}</span>
                  <span style={{ fontSize: '8.5px', fontWeight: 700, color: r.typeColor, background: `${r.typeColor}18`, borderRadius: '100px', padding: '2px 7px', flexShrink: 0, whiteSpace: 'nowrap' }}>{r.type}</span>
                </div>
                <p style={{ fontSize: '9.5px', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginBottom: '5px' }}>{r.dept} · {r.location}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {r.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '8.5px', fontWeight: 600, color: '#2F5FE0', background: '#E8F0FE', borderRadius: '100px', padding: '1.5px 7px' }}>{tag}</span>
                  ))}
                  <span style={{ marginLeft: 'auto', fontSize: '9px', color: '#9AA1AE', fontFamily: 'var(--font-body)' }}>{r.applicants} applicants</span>
                </div>
              </div>
              );
            })}
          </div>

          {/* Detail panel for whichever role is selected */}
          <AnimatePresence mode="wait">
          <motion.div key={selectedRole.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} style={{ background: '#fff', borderRadius: '10px', border: '1px solid #E8EAF0', padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>{selectedRole.title}</p>
              {/* Pressing this is what visibly triggers the loop restart —
                  matches the "click to loop" pattern used elsewhere in this
                  file (Pitch AI's Use Script) instead of a silent reset. */}
              <motion.span
                animate={applyPressed ? { scale: 0.92 } : { scale: 1 }}
                transition={{ duration: 0.15 }}
                style={{ fontSize: '9.5px', fontWeight: 700, color: '#fff', background: '#041635', borderRadius: '7px', padding: '5px 10px', whiteSpace: 'nowrap', position: 'relative' }}
              >
                Apply Now
                {applyPressed && (
                  <motion.span initial={{ opacity: 0.4 }} animate={{ opacity: 0 }} transition={{ duration: 0.35 }} style={{ position: 'absolute', inset: 0, borderRadius: '7px', background: '#fff' }} />
                )}
              </motion.span>
            </div>
            <p style={{ fontSize: '10px', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>Nova Robotics · {selectedRole.dept}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
              {selectedRole.detail!.pills.map(tag => (
                <span key={tag} style={{ fontSize: '8.5px', fontWeight: 600, color: '#2F5FE0', background: '#E8F0FE', borderRadius: '100px', padding: '2px 8px' }}>{tag}</span>
              ))}
            </div>

            <p style={{ fontSize: '9.5px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', marginBottom: '5px' }}>Responsibilities</p>
            <ul style={{ listStyle: 'disc', paddingLeft: '15px', display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '10px' }}>
              {selectedRole.detail!.responsibilities.map(r => (
                <li key={r} style={{ fontSize: '9.5px', color: '#3A3F4C', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>{r}</li>
              ))}
            </ul>

            <p style={{ fontSize: '9.5px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', marginBottom: '5px' }}>Skills &amp; Qualifications</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
              {selectedRole.detail!.skills.map(s => (
                <span key={s} style={{ fontSize: '8.5px', fontWeight: 600, color: '#3A3F4C', background: '#F3F4F6', borderRadius: '100px', padding: '2px 8px' }}>{s}</span>
              ))}
            </div>

            <p style={{ fontSize: '9.5px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', marginBottom: '5px' }}>Benefits &amp; Perks</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px' }}>
              {selectedRole.detail!.benefits.map(b => (
                <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '9.5px', color: '#3A3F4C', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" style={{ marginTop: '2px', flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                  {b}
                </li>
              ))}
            </ul>

            <p style={{ fontSize: '9.5px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', marginBottom: '5px' }}>About the role</p>
            <p style={{ fontSize: '9.5px', color: '#3A3F4C', fontFamily: 'var(--font-body)', lineHeight: 1.55 }}>
              {selectedRole.detail!.about}
            </p>
          </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
