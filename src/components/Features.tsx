'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BarChart3, Sparkles, Video, Link2, Zap } from 'lucide-react';

/** Counts 0 → target with an ease-out, holds, then loops — so a card that's
 *  scrolled back into view still reads as "live" instead of a frozen number.
 *  Driven by setInterval + elapsed-time, not requestAnimationFrame — rAF
 *  gets throttled hard by browsers while a tab hasn't taken focus yet (same
 *  reasoning as the hero-reveal CSS entrance below), which would leave the
 *  count stuck at 0 indefinitely in that case. setInterval keeps ticking. */
function CountUp({ target, decimals = 0, suffix = '', duration = 1.3, holdMs = 2600 }: { target: number; decimals?: number; suffix?: string; duration?: number; holdMs?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let cancelled = false;
    let interval: ReturnType<typeof setInterval>;
    let loopTimer: ReturnType<typeof setTimeout>;
    const run = () => {
      const start = Date.now();
      interval = setInterval(() => {
        if (cancelled) return;
        const p = Math.min(1, (Date.now() - start) / (duration * 1000));
        setVal(target * (1 - Math.pow(1 - p, 3)));
        if (p >= 1) {
          clearInterval(interval);
          loopTimer = setTimeout(() => { if (!cancelled) { setVal(0); run(); } }, holdMs);
        }
      }, 30);
    };
    run();
    return () => { cancelled = true; clearInterval(interval); clearTimeout(loopTimer); };
  }, [target, duration, holdMs]);
  return <>{val.toFixed(decimals)}{suffix}</>;
}

/** Same looping count, but drives a bar's width% instead of rendering text. */
function AnimatedBar({ pct, color, delay = 0 }: { pct: number; color: string; delay?: number }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    let cancelled = false;
    const start = setTimeout(() => { if (!cancelled) setW(pct); }, delay);
    const loop = setInterval(() => {
      if (cancelled) return;
      setW(0);
      setTimeout(() => { if (!cancelled) setW(pct); }, 120);
    }, 4000);
    return () => { cancelled = true; clearTimeout(start); clearInterval(loop); };
  }, [pct, delay]);
  return <div style={{ height: '100%', width: `${w}%`, borderRadius: '2px', background: color, transition: 'width 1.1s cubic-bezier(0.22,1,0.36,1)' }} />;
}

const RESLINK_ROWS = [
  { title: 'SDR-Bright-Labs', url: 'reslink.io/reslink/sdr-bright-labs', views: 6, last: '3d ago', expanded: false },
  { title: 'CS-Renewal-Outreach', url: 'reslink.io/reslink/cs-renewal-outreach', views: 11, last: '1d ago', expanded: false },
  { title: 'AE-Stripe-Enterprise', url: 'reslink.io/reslink/ae-stripe-enterprise', views: 19, last: '4 hrs ago', expanded: true },
];

const ALL_LOCATIONS = [
  { city: 'Seattle, WA', pct: 35 },
  { city: 'San Francisco, CA', pct: 28 },
  { city: 'Austin, TX', pct: 14 },
  { city: 'New York, NY', pct: 12 },
];

/** Small ascending-bar sparkline, matching the tiny trend chart the real
 *  Unique Visitors tile shows. */
function Sparkline() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '16px', marginTop: '5px' }}>
      {[6, 9, 7, 12, 15].map((h, i) => (
        <div key={i} style={{ width: '4px', height: `${h}px`, borderRadius: '1px', background: '#0C63E3', opacity: 0.35 + i * 0.14 }} />
      ))}
    </div>
  );
}

/** Matches the real app's Reslinks table (title/status/url, views, last
 *  viewed, actions) with the last row's Insights panel expanded beneath
 *  it — a real table + a single side-by-side row of stat cards, not the
 *  stacked 2x2 abstract mockup this used to be. "Show more" on Top
 *  Locations actually unfolds three more rows on a loop, gated on
 *  visibility like the other animated visuals. */
function AnalyticsVisual() {
  const [locExpanded, setLocExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const runCycle = () => {
      setLocExpanded(false);
      timers.push(setTimeout(() => { if (!cancelled) setLocExpanded(true); }, 2600));
      timers.push(setTimeout(() => { if (!cancelled) runCycle(); }, 2600 + 3400));
    };
    runCycle();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [inView]);

  return (
    <div ref={rootRef} style={{ width: '100%', height: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '2px', background: '#fff' }}>
      <div style={{ marginBottom: '6px' }}>
        <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '14px', fontWeight: 900, color: '#041635', letterSpacing: '-0.01em' }}>MY RESLINKS</p>
        <p style={{ fontSize: '10px', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginTop: '2px' }}>10 active · 12 total</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 0.5fr 0.8fr 1.1fr', gap: '8px', padding: '0 6px 6px', fontSize: '8px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#9AA1AE', fontFamily: 'var(--font-body)' }}>
        <span>Reslink title</span><span>Views</span><span>Last viewed</span><span style={{ textAlign: 'right' }}>Actions</span>
      </div>

      {RESLINK_ROWS.map(row => (
        <div key={row.title} style={{ display: 'grid', gridTemplateColumns: '1.7fr 0.5fr 0.8fr 1.1fr', gap: '8px', alignItems: 'center', padding: '9px 6px', borderTop: '1px solid #F0F1F4', borderRadius: row.expanded ? '8px 8px 0 0' : 0, background: row.expanded ? '#F7F9FC' : 'transparent' }}>
          <div style={{ minWidth: 0 }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>{row.title}</span>
            <span style={{ fontSize: '8px', fontWeight: 700, color: '#16A34A', background: '#EAFBEF', borderRadius: '4px', padding: '1.5px 5px', marginLeft: '6px' }}>Active</span>
            <p style={{ fontSize: '8.5px', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.url}</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}><CountUp target={row.views} /></span>
          <span style={{ fontSize: '10px', color: '#6B7280', fontFamily: 'var(--font-body)' }}>{row.last}</span>
          <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '9px', fontWeight: 700, color: row.expanded ? '#0C63E3' : '#6B7280', background: row.expanded ? '#EEF4FF' : '#F1F3F5', borderRadius: '6px', padding: '4px 7px', fontFamily: 'var(--font-body)' }}>
              Insights
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points={row.expanded ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} /></svg>
            </span>
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#fff', background: '#0C63E3', borderRadius: '6px', padding: '4px 8px', fontFamily: 'var(--font-body)' }}>View</span>
          </div>
        </div>
      ))}

      {/* Expanded Insights panel, directly beneath the active row. `layout`
          so the card smoothly grows/shrinks as locations unfold instead of
          the surrounding frame reserving a big fixed height that leaves
          empty gray space whenever it's collapsed. */}
      <motion.div layout transition={{ layout: { duration: 0.35, ease: 'easeInOut' } }} style={{ background: '#F7F9FC', border: '1px solid #EDF0F4', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '12px', marginTop: '-2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '9px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9AA1AE" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#041635', fontFamily: 'var(--font-body)' }}>Performance Analytics</span>
          <span style={{ marginLeft: 'auto', fontSize: '9px', color: '#9AA1AE', fontFamily: 'var(--font-body)', background: '#fff', border: '1px solid #E4E7EC', borderRadius: '5px', padding: '2px 7px' }}>Last 7 days</span>
        </div>

        <div className="insights-stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '7px' }}>
          <div style={{ background: '#fff', border: '1px solid #E8EAF0', borderRadius: '8px', padding: '9px 10px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0C63E3" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            <p style={{ fontSize: '8px', color: '#6B7280', fontFamily: 'var(--font-body)', marginTop: '5px' }}>Unique Visitors</p>
            <p style={{ fontSize: '17px', fontWeight: 900, color: '#041635', fontFamily: 'var(--font-phudu)', lineHeight: 1, marginTop: '3px' }}><CountUp target={16} /></p>
            <Sparkline />
          </div>
          <div style={{ background: '#fff', border: '1px solid #E8EAF0', borderRadius: '8px', padding: '9px 10px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <p style={{ fontSize: '8px', color: '#6B7280', fontFamily: 'var(--font-body)', marginTop: '5px' }}>Avg Watch Time</p>
            <p style={{ fontSize: '17px', fontWeight: 900, color: '#041635', fontFamily: 'var(--font-phudu)', lineHeight: 1, marginTop: '3px' }}><CountUp target={52} suffix="s" /></p>
            <p style={{ fontSize: '8px', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginTop: '4px' }}>85% completion</p>
          </div>
          <div style={{ background: '#fff', border: '1px solid #E8EAF0', borderRadius: '8px', padding: '9px 10px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            <p style={{ fontSize: '8px', color: '#6B7280', fontFamily: 'var(--font-body)', marginTop: '5px' }}>Clicks</p>
            <p style={{ fontSize: '17px', fontWeight: 900, color: '#041635', fontFamily: 'var(--font-phudu)', lineHeight: 1, marginTop: '3px' }}><CountUp target={9} /></p>
            <p style={{ fontSize: '8px', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginTop: '4px' }}>3 badge · 4 portfolio</p>
          </div>
          <div style={{ background: '#fff', border: '1px solid #E8EAF0', borderRadius: '8px', padding: '9px 10px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C4257B" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <p style={{ fontSize: '8px', color: '#6B7280', fontFamily: 'var(--font-body)', marginTop: '5px' }}>Top Locations</p>
            <AnimatePresence initial={false}>
              {ALL_LOCATIONS.filter((_, i) => i === 0 || locExpanded).map((l, i) => (
                <motion.div key={l.city} initial={i > 0 ? { opacity: 0, height: 0 } : false} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }} style={{ marginTop: '5px', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <span style={{ fontSize: '9px', color: '#3A3F4C', fontFamily: 'var(--font-body)' }}>{l.city}</span>
                    <span style={{ fontSize: '9px', color: '#9AA1AE', fontFamily: 'var(--font-body)' }}>{l.pct}%</span>
                  </div>
                  <div style={{ height: '3px', borderRadius: '2px', background: '#EDF0F4' }}>
                    <AnimatedBar pct={l.pct} color="#C4257B" delay={i * 100} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <p style={{ fontSize: '8px', color: '#0C63E3', fontWeight: 600, fontFamily: 'var(--font-body)', marginTop: '5px' }}>{locExpanded ? 'Show less' : 'Show more (+3)'}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const PITCH_ROLE = 'Sales Development Rep';
const PITCH_DESC = 'We’re looking for a Sales Development Rep to own top-of-funnel outreach, qualify inbound leads, and partner with Account Executives to build pipeline. You’ll run daily prospecting across email, phone, and LinkedIn, book qualified discovery calls, and keep our CRM clean and up to date. You will also collaborate with marketing on messaging, log every touchpoint for accurate forecasting, and help refine our outbound playbook as the team scales. This is a quota-carrying role with real room to grow into a closing position within 12-18 months for reps who consistently exceed target — we promote from within whenever we can. 3+ years of B2B SaaS prospecting experience preferred, along with strong written communication, comfort with a fast-paced quota-driven environment, familiarity with Salesforce or HubSpot, and a track record of consistently hitting monthly targets.';
const PITCH_SCRIPT = [
  'Hey there! My name is Alex, and I am excited to introduce myself. I have 5 years of experience as a Sales Development Rep, during which I have had the opportunity to work on a variety of exciting projects.',
  'One of my proudest achievements was leading a team of 15 and increasing sales by 51%. It was an incredible learning experience that really strengthened my leadership and strategic thinking skills.',
  'I am particularly drawn to this role because it matches my skills and career goals. I believe my background aligns well with what you are looking for.',
];

/** One continuously-scrolling panel (not a page swap) — loops through:
 *  typing the role → pasting a job description → a brief "generating"
 *  state → the script + rewrite options landing below, with the panel
 *  auto-scrolling down to reveal them → hold → scroll back up → reset. */
function PitchAIVisual() {
  const [phase, setPhase] = useState<'role' | 'desc' | 'generating' | 'result'>('role');
  const [typedRole, setTypedRole] = useState('');
  const [pasted, setPasted] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [clickingScript, setClickingScript] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  // Gate the cycle on visibility rather than mount: a fixed mount-time loop
  // means whatever moment a visitor happens to scroll this card into view is
  // pure luck — half the time that's the held 'result' state, which reads as
  // frozen since nothing moves for seconds. Restarting fresh from 'role'
  // every time it re-enters view guarantees the same seamless first
  // impression (typing → pasting → generating → result) no matter when
  // someone scrolls to it.
  const inView = useInView(rootRef, { amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];
    const after = (ms: number, fn: () => void) => timers.push(setTimeout(() => { if (!cancelled) fn(); }, ms));

    // Manual eased scroll (setInterval + elapsed-time, not requestAnimationFrame
    // — same reasoning as CountUp above) so the panel visibly, slowly makes
    // its way down to the buttons instead of the near-instant native
    // scrollTo(smooth), which read as the script "scrolling away" the moment
    // it appeared rather than something you had time to actually see.
    // ease-in-out (not ease-out-only) so it starts and settles gently
    // instead of lurching into motion — reads as one fluid motion, not a
    // mechanical snap.
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
      setPhase('role');
      setTypedRole('');
      setPasted(false);
      setAtBottom(false);
      setClickingScript(false);

      let i = 0;
      const typeRole = () => {
        if (cancelled) return;
        i++;
        setTypedRole(PITCH_ROLE.slice(0, i));
        if (i < PITCH_ROLE.length) timers.push(setTimeout(typeRole, 32));
      };
      after(400, typeRole);

      const tRoleDone = 400 + PITCH_ROLE.length * 32;
      after(tRoleDone + 350, () => setPhase('desc'));
      after(tRoleDone + 500, () => setPasted(true));

      const tPasted = tRoleDone + 500;
      after(tPasted + 700, () => setPhase('generating'));
      const tResult = tPasted + 1900;
      after(tResult, () => setPhase('result'));
      // Start scrolling almost immediately once the script lands — just
      // enough of a beat for its fade-in to register, not a "sit and read
      // it first" pause. Scrolling down IS how you see the script land, so
      // waiting before starting that motion made the card look done/stuck.
      const tScrollStart = tResult + 300;
      const scrollDuration = 2000;
      after(tScrollStart, () => {
        if (scrollRef.current) slowScrollTo(scrollRef.current.scrollHeight, scrollDuration);
      });
      const tAtBottom = tScrollStart + scrollDuration;
      after(tAtBottom, () => setAtBottom(true));
      // A visible "click" on Use Script — cursor arrives, taps the button —
      // is what actually triggers the loop restart, instead of it silently
      // resetting off-screen with no cause shown.
      after(tAtBottom + 950, () => setClickingScript(true));
      after(tAtBottom + 950 + 400, runCycle);
    };
    runCycle();
    return () => { cancelled = true; timers.forEach(clearTimeout); intervals.forEach(clearInterval); };
  }, [inView]);

  return (
    <div ref={rootRef} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <div style={{ background: 'linear-gradient(135deg, #0B1120 0%, #0D1829 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: 'none', flexShrink: 0 }}>
        {/* Icon square removed — the sparkle glyph wasn't adding anything
            the text didn't already say, just noise next to the label. */}
        <div>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-body)', letterSpacing: '0.06em', display: 'block', lineHeight: 1.1 }}>RESLINK PITCH AI</span>
          <span style={{ fontSize: '10px', color: '#D8F950', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.04em' }}>Script Generator</span>
        </div>
        <div style={{ marginLeft: 'auto', width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
      </div>

      {/* Everything below scrolls as one panel — the script lands underneath
          the role/description instead of replacing them on a separate page. */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'hidden' }}>
        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>Role you&apos;re applying for</p>
            <div style={{ border: '1px solid #E4E7EC', borderRadius: '10px', padding: '11px 14px', background: '#FAFBFC', fontSize: '13px', color: '#1A1E2A', fontFamily: 'var(--font-body)', minHeight: '18px', display: 'flex', alignItems: 'center' }}>
              {typedRole}
              {phase === 'role' && (
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.9 }} style={{ display: 'inline-block', width: '1.5px', height: '14px', background: '#0C63E3', marginLeft: '2px' }} />
              )}
            </div>
          </div>

          <div>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>Job description</p>
            {/* layout + a fade/slide swap (not an instant text dump with a
                background-color flash) so the placeholder growing into the
                full paragraph reads as one fluid motion — the box's own
                height eases open too, instead of jumping tall instantly. */}
            <motion.div
              layout
              transition={{ layout: { duration: 0.55, ease: 'easeInOut' } }}
              style={{ border: '1px solid #E4E7EC', borderRadius: '10px', padding: '11px 14px', background: '#FAFBFC', fontSize: '11.5px', color: '#3A3F4C', lineHeight: 1.55, fontFamily: 'var(--font-body)', minHeight: '44px', overflow: 'hidden' }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {pasted ? (
                  <motion.div key="desc" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
                    {PITCH_DESC}
                  </motion.div>
                ) : (
                  <motion.span key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ color: '#C7CBD3' }}>
                    Paste the job description…
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {phase === 'generating' && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} style={{ width: '13px', height: '13px', borderRadius: '50%', border: '2px solid #E4E7EC', borderTopColor: '#0C63E3' }} />
              <span style={{ fontSize: '12px', color: '#6B7280', fontFamily: 'var(--font-body)' }}>Generating your script…</span>
            </motion.div>
          )}

          {phase === 'result' && (
            <>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} style={{ border: '1px solid #E8EAF0', borderRadius: '10px', padding: '14px', background: '#FAFBFC', fontSize: '12px', color: '#1A1E2A', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
                {PITCH_SCRIPT.map((p, i) => <p key={i} style={{ marginBottom: i < PITCH_SCRIPT.length - 1 ? '10px' : 0 }}>{p}</p>)}
              </motion.div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px' }}>
                {[
                  { icon: '✂', label: 'Shorten it' },
                  { icon: '💬', label: 'Make it casual' },
                  { icon: '↗', label: 'Lengthen it' },
                  { icon: '📄', label: 'Make it formal' },
                ].map((b, i) => (
                  <motion.div key={b.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06, duration: 0.25 }} style={{ border: '1px solid #E4E7EC', borderRadius: '8px', padding: '9px 12px', fontSize: '11px', fontWeight: 600, color: '#3A3F4C', fontFamily: 'var(--font-body)', textAlign: 'center', cursor: 'pointer', background: '#fff' }}>
                    {b.label}
                  </motion.div>
                ))}
              </div>

              <div style={{ border: '1px solid #E4E7EC', borderRadius: '8px', padding: '9px 12px', fontSize: '11px', color: '#B0B4BE', fontFamily: 'var(--font-body)', background: '#FAFBFC', display: 'flex', alignItems: 'center', gap: '7px' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#D8F950"><path d="M12 1.5 L13.2 9.8 L21.5 12 L13.2 14.2 L12 22.5 L10.8 14.2 L2.5 12 L10.8 9.8 Z"/></svg>
                Tell us what you want to change in the script
              </div>

              {/* Once the panel finishes scrolling down, a gentle pulse on
                  the final CTA keeps the card feeling alive, then it presses
                  itself — that press is what visibly triggers the loop
                  restart. No cursor prop for this one; the button doing its
                  own press reads as more fluid than a cursor flying in. */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={
                  clickingScript ? { opacity: 1, y: 0, scale: 0.95 }
                  : atBottom ? { opacity: 1, y: 0, scale: [1, 1.025, 1] }
                  : { opacity: 1, y: 0 }
                }
                transition={clickingScript ? { duration: 0.16, ease: 'easeOut' } : atBottom ? { repeat: Infinity, duration: 2, ease: 'easeOut' } : { delay: 0.4, duration: 0.25 }}
                style={{ background: '#D8F950', borderRadius: '8px', padding: '11px', textAlign: 'center', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', marginBottom: '4px', position: 'relative' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#041635" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#041635', fontFamily: 'var(--font-body)' }}>Use Script</span>
                {clickingScript && (
                  <motion.span initial={{ opacity: 0.4 }} animate={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ position: 'absolute', inset: 0, borderRadius: '8px', background: '#041635' }} />
                )}
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const TELEPROMPTER_SCRIPT = 'Hi, I’m Oliver. I’ve spent three years building backend systems that handle millions of requests every day. At my last role I led the migration to a microservices architecture that cut our average API latency by forty percent and made our on-call rotations dramatically calmer. I’m looking for a senior engineering role where I can keep solving problems at that kind of scale, ideally on a team that cares as much about reliability as they do about shipping fast.';

/** Scrolls a full script continuously, not a fixed 40px hop — the bug was a
 *  short one-liner getting scrolled a fixed distance past its own actual
 *  height, leaving a blank gap before the loop repeated. Measures the
 *  text's real rendered height via ref and scrolls exactly that far, so
 *  there's always a line of text on screen. */
function TeleprompterVisual() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const windowHeight = 62;

  useEffect(() => {
    if (textRef.current) setScrollDistance(Math.max(0, textRef.current.scrollHeight - windowHeight));
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Live camera feed — real person */}
      <video
        src="/videos/pip-person-compressed.mp4"
        poster="/videos/pip-person-poster.jpg"
        autoPlay muted loop playsInline preload="auto"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {/* Dark overlay for readability */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,15,26,0.85) 0%, rgba(11,15,26,0.1) 50%, rgba(11,15,26,0.3) 100%)' }} />
      {/* REC badge */}
      <div style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', borderRadius: '6px', padding: '5px 10px', zIndex: 2 }}>
        <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444' }} />
        <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)' }}>REC 0:41</span>
      </div>
      {/* Teleprompter overlay at bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(4,22,53,0.82)', backdropFilter: 'blur(10px)', padding: '14px 18px', zIndex: 2, borderTop: '1px solid rgba(216,249,80,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D8F950' }} />
          <span style={{ fontSize: '9px', fontWeight: 700, color: '#D8F950', letterSpacing: '0.12em', fontFamily: 'var(--font-body)' }}>TELEPROMPTER · 1.0x</span>
        </div>
        <div style={{ overflow: 'hidden', height: `${windowHeight}px` }}>
          <motion.p
            ref={textRef}
            animate={scrollDistance > 0 ? { y: [0, -scrollDistance] } : {}}
            transition={{ duration: 5 + scrollDistance / 22, ease: 'linear', repeat: Infinity, repeatDelay: 1.2 }}
            style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}
          >
            {TELEPROMPTER_SCRIPT}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

const BADGE_TILES = [
  { Icon: Zap, title: 'One click', desc: 'Recruiters go straight to your Reslink from any PDF viewer' },
  { Icon: Link2, title: 'Always linked', desc: 'Every copy of your resume has the badge automatically' },
  { Icon: BarChart3, title: 'Trackable', desc: 'See how many recruiters clicked through to your Reslink' },
];

/** Loops: cursor drifts to "Play Intro" → click bounce → an intro video
 *  bubble pops in and plays → holds → fades out → cursor resets. Gated on
 *  visibility (like PitchAIVisual) so a visitor always lands on the calm,
 *  idle resume state — never mid-click or mid-play. */
function BadgeVisual() {
  const [playing, setPlaying] = useState(false);
  const [clicking, setClicking] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const runCycle = () => {
      setPlaying(false);
      setClicking(false);
      timers.push(setTimeout(() => { if (!cancelled) setClicking(true); }, 1800));
      timers.push(setTimeout(() => { if (!cancelled) { setClicking(false); setPlaying(true); } }, 2150));
      timers.push(setTimeout(() => { if (!cancelled) runCycle(); }, 2150 + 4200));
    };
    runCycle();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [inView]);

  return (
    <div ref={rootRef} style={{ width: '100%', height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#F7F8FA', justifyContent: 'center', position: 'relative' }}>
      <div style={{ background: '#fff', borderRadius: '10px', border: '1px solid #E4E7EC', padding: '16px 18px', boxShadow: '0 4px 16px rgba(4,22,53,0.06)', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <p style={{ fontSize: '16px', fontWeight: 800, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>First &amp; Last Name</p>
            <p style={{ fontSize: '10px', color: '#6B7280', fontFamily: 'var(--font-body)', marginTop: '3px' }}>City, State · 555-000-0000 · email@gmail.com</p>
            <p style={{ fontSize: '10px', color: '#6B7280', fontFamily: 'var(--font-body)', marginTop: '1px' }}>linkedin.com/in/name</p>
          </div>
          {/* Rectangular with rounded corners, not a full pill — matches the
              rest of the site's button shape language. Idle attention cue is
              two chevrons drifting inward toward the button, made bigger and
              higher-contrast this round, plus a small synced scale pulse on
              the button itself so the whole thing reads as one coordinated
              "look here, click here" gesture. */}
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
            {!clicking && !playing && (
              <>
                <motion.svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0C63E3" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                  animate={{ x: [-6, 2, -6], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                  style={{ position: 'absolute', left: '-22px', top: '50%', marginTop: '-6.5px' }}>
                  <polyline points="9 6 15 12 9 18" />
                </motion.svg>
                <motion.svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0C63E3" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                  animate={{ x: [6, -2, 6], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                  style={{ position: 'absolute', right: '-22px', top: '50%', marginTop: '-6.5px', rotate: 180 }}>
                  <polyline points="9 6 15 12 9 18" />
                </motion.svg>
              </>
            )}
            <motion.div
              animate={clicking ? { scale: 0.9 } : playing ? { scale: 1 } : { scale: [1, 1.035, 1] }}
              transition={clicking ? { duration: 0.15 } : playing ? { duration: 0.15 } : { repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#0C63E3', borderRadius: '9px', padding: '7px 13px', cursor: 'pointer', position: 'relative' }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)' }}>Play Intro</span>
              {/* Restrained click feedback — one soft white flash over the
                  button, not the loud multi-ring/glow effect from before. */}
              {clicking && (
                <motion.span initial={{ opacity: 0.45 }} animate={{ opacity: 0 }} transition={{ duration: 0.35 }} style={{ position: 'absolute', inset: 0, borderRadius: '9px', background: '#fff' }} />
              )}
            </motion.div>
          </div>

          {/* Cursor drifting toward, then "clicking", the Play Intro button —
              sized up and given a white outline stroke so it reads clearly
              against both the white card and the blue button underneath it. */}
          <motion.div
            animate={clicking || playing ? { top: '18px', right: '16px', scale: 0.92 } : { top: '44px', right: '88px', scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', zIndex: 4, pointerEvents: 'none' }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.4))' }}>
              <path d="M4 2l14 6-5.5 2L18 15l-2.5 2.5L11 12l-2 5.5z" fill="#041635" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
        {/* Real-looking resume lines (varied color/weight, small bullet
            markers) rather than uniform flat-gray skeleton bars, which read
            as a "still loading" placeholder instead of actual content. */}
        <div style={{ borderTop: '1px solid #F0F1F4', paddingTop: '10px' }}>
          <p style={{ fontSize: '9px', fontWeight: 700, color: '#3A3F4C', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '7px', fontFamily: 'var(--font-body)' }}>Summary</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
            <div style={{ height: '6px', borderRadius: '3px', background: '#C7CDD6', width: '100%' }} />
            <div style={{ height: '6px', borderRadius: '3px', background: '#C7CDD6', width: '85%' }} />
            <div style={{ height: '6px', borderRadius: '3px', background: '#D7DBE2', width: '92%' }} />
          </div>
          <p style={{ fontSize: '9px', fontWeight: 700, color: '#3A3F4C', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '7px', fontFamily: 'var(--font-body)' }}>Experience</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[100, 78, 88, 70].map((w, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#9AA1AE', flexShrink: 0 }} />
                <div style={{ height: '6px', borderRadius: '3px', background: i % 2 ? '#D7DBE2' : '#C7CDD6', width: `${w}%` }} />
              </div>
            ))}
          </div>
        </div>

        {/* Intro video bubble — pops in on "click", plays, fades out. Sits
            lower, clear of the browser-chrome bar above the frame. No
            border now (blue read as unnecessary) — depth comes from the
            shadow alone. Slightly bigger than before, taller than wide. */}
        <AnimatePresence>
          {playing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -4 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', top: '58px', right: '2px', width: '136px', height: '148px', borderRadius: '16px', overflow: 'hidden', border: '2px solid #fff', boxShadow: '0 18px 44px rgba(0,0,0,0.35)', zIndex: 5 }}
            >
              <video src="/videos/pip-person-compressed.mp4" poster="/videos/pip-person-poster.jpg" autoPlay muted loop playsInline preload="auto" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: '7px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(4,22,53,0.78)', borderRadius: '100px', padding: '3px 9px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#D8F950', display: 'inline-block' }} />
                <span style={{ fontSize: '9px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)' }}>PLAYING</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        {BADGE_TILES.map(b => (
          <div key={b.title} style={{ background: '#fff', borderRadius: '10px', border: '1px solid #E4E7EC', padding: '12px 10px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '7px', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '7px' }}>
              <b.Icon size={13} color="#0C63E3" strokeWidth={2.2} />
            </div>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>{b.title}</p>
            <p style={{ fontSize: '10px', color: '#6B7280', fontFamily: 'var(--font-body)', lineHeight: 1.4 }}>{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const tabs = [
  {
    id: 'analytics',
    label: 'Insights',
    icon: BarChart3,
    headline: 'See who watched, and for how long',
    sub: '',
    bullets: [
      'Every recruiter who opened it, and when',
      'Watch time and completion rate per view',
      'Track resume, portfolio and LinkedIn clicks',
    ],
    bg: '#fff',
    auto: true,
    visual: <AnalyticsVisual />,
  },
  {
    id: 'pitchai',
    label: 'Pitch AI',
    icon: Sparkles,
    headline: 'Get a script built\nfor the role',
    sub: '',
    bullets: [
      'Paste the job description, get a script',
      'Written from your own experience',
      'Shorter, longer, casual, formal - one click',
    ],
    bg: '#fff',
    tall: true,
    visual: <PitchAIVisual />,
  },
  {
    id: 'teleprompter',
    label: 'Teleprompter',
    icon: Video,
    headline: 'Look confident.\nSound confident',
    sub: '',
    bullets: [
      'Your script scrolls as you record',
      'Eyes on the camera, not on notes',
      'A natural take in one or two tries',
    ],
    bg: '#0B0F1A',
    visual: <TeleprompterVisual />,
  },
  {
    id: 'badge',
    label: 'Apply Anywhere',
    icon: Link2,
    headline: 'A Play button inside your resume',
    sub: '',
    bullets: [
      'Embeds directly in your resume PDF',
      'Every copy carries it automatically',
      'One click straight to your video',
    ],
    bg: '#F7F8FA',
    tall: true,
    visual: <BadgeVisual />,
  },
];

// Order must mirror `tabs` so the sidebar reads top-to-bottom in the same
// sequence as the stacked cards below it.
const FEATURE_GROUPS: { label: string; ids: string[] }[] = [
  { label: 'Track', ids: ['analytics'] },
  { label: 'Create', ids: ['pitchai', 'teleprompter'] },
  { label: 'Share', ids: ['badge'] },
];

// Per-feature accent colours — card 1 blue, cards 2 & 3 pink, card 4 green.
// `badge`/`badgeBg` colour the eyebrow pill; `bullet`/`check` colour the
// checkmark circle and its tick in the bullet list.
const ACCENT: Record<string, { badge: string; badgeBg: string; bullet: string; check: string }> = {
  analytics:    { badge: '#1468E8', badgeBg: '#EAF1FF', bullet: '#1468E8', check: '#fff' },
  pitchai:      { badge: '#D63D9D', badgeBg: '#FBEAF5', bullet: '#D63D9D', check: '#fff' },
  teleprompter: { badge: '#D63D9D', badgeBg: '#FBEAF5', bullet: '#D63D9D', check: '#fff' },
  badge:        { badge: '#5B7A0F', badgeBg: '#EEF7CF', bullet: '#C2E532', check: '#041635' },
};

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Scrollspy: highlight whichever feature card is currently in view.
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.38;
      let current = 0;
      featureRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActiveTab(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Keep the active pill scrolled into view in the horizontally-scrolling mobile nav.
  useEffect(() => {
    navRefs.current[activeTab]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeTab]);

  const goToFeature = (i: number) => {
    const el = featureRefs.current[i];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <section style={{ padding: 'clamp(72px, 9vw, 112px) 24px', background: '#F7F8FA' }}>
      <style>{`
        .feat-inner { max-width: 1060px; margin: 0 auto; }
        .feat-layout { display: grid; grid-template-columns: 248px 1fr; gap: clamp(28px, 4vw, 52px); text-align: left; }
        .feat-nav-col { min-width: 0; }
        .feat-side-sticky { position: sticky; top: 96px; display: flex; flex-direction: column; gap: 32px; }
        .feat-side-head { }
        .feat-nav { display: flex; flex-direction: column; gap: 22px; }
        .feat-group-label { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #9AA1AE; font-family: var(--font-body); margin-bottom: 8px; padding-left: 14px; }
        .feat-navitem {
          position: relative; display: flex; align-items: center; gap: 10px; width: 100%;
          padding: 11px 14px; border: none; background: transparent; border-radius: 10px;
          font-size: 15px; font-weight: 500; color: #6B7280; font-family: var(--font-body);
          cursor: pointer; text-align: left; transition: color 0.18s;
        }
        .feat-navitem > * { position: relative; z-index: 1; }
        .feat-navitem:hover:not(.active) { color: #041635; }
        .feat-navitem.active { color: #041635; font-weight: 700; }
        .feat-dot { width: 7px; height: 7px; border-radius: 50%; background: #C9CFD9; flex-shrink: 0; transition: background 0.18s; }
        .feat-navitem.active .feat-dot { background: #D8F950; box-shadow: 0 0 0 3px rgba(216,249,80,0.35); }
        .feat-card {
          background: #fff; border: 1px solid #E6E9EF; border-radius: 22px;
          padding: clamp(18px, 2.4vw, 30px);
          box-shadow: 0 2px 12px rgba(4,22,53,0.05);
        }
        .feat-eyebrow {
          display: inline-flex; align-items: center; gap: 8px; margin-bottom: 16px;
          font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
          color: #041635; font-family: var(--font-body);
          background: #F1F4F8; border-radius: 100px; padding: 6px 14px;
        }
        .feat-divider { height: 1px; background: #ECEFF4; margin: 28px 0 24px; }
        .feat-body { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
        /* Same lift-on-hover as the companies-page feature demos:
           scale up a touch and deepen the shadow. */
        .feat-visual-frame { border-radius: 14px; overflow: hidden; border: 1px solid #E2E4E9; box-shadow: 0 12px 40px rgba(4,22,53,0.1); cursor: default; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .feat-visual-frame:hover { transform: scale(1.01); box-shadow: 0 24px 64px rgba(4,22,53,0.16); }
        .feat-visual-bar { background: #F1F3F5; border-bottom: 1px solid #E2E4E9; padding: 9px 14px; display: flex; align-items: center; gap: 8px; }
        .feat-visual { height: 340px; overflow: hidden; }
        /* Pitch AI and Apply Anywhere both needed more breathing room than
           the others — their content was hugging the top chrome bar and the
           bottom of the frame. .tall must be at least as specific as the
           mobile overrides below so it doesn't get silently beaten by them
           at narrow widths. */
        .feat-visual.tall { height: 420px; }
        /* Insights reserves a fixed height sized to its fully-expanded state
           (the Top Locations list animates open/closed on a loop). A fixed
           frame keeps that animation clipped inside the visual so the height
           never changes — otherwise the reflow shoved the heading and bullet
           copy beneath it up and down. !important so it wins over the mobile
           height overrides regardless of specificity/media-query order. */
        .feat-visual.auto { height: 444px !important; }
        .feat-swipe-hint { display: none; }
        @media (max-width: 900px) {
          .feat-body { grid-template-columns: 1fr !important; }
          /* The "Apply Anywhere" visual's 3-tile row wraps to more lines once the
             frame goes full-width on a narrow screen, and with the visual centered
             vertically inside a fixed height, that extra height was pushing the top
             of the resume mockup (the Play Intro pill) out of the clipped frame. */
          .feat-visual, .feat-visual.tall { height: 460px; }
          .feat-visual.auto { height: 460px !important; }
        }
        @media (max-width: 420px) {
          .feat-visual, .feat-visual.tall { height: 520px; }
          /* Taller than the desktop 444px because the stat tiles below go
             two-per-row instead of four, which adds a row of height. */
          .feat-visual.auto { height: 670px !important; }
        }
        /* Insights' four stat tiles get squeezed to ~65px each once the
           frame is full-width on a phone, which pushed the Top Locations
           tile (city + percentage on one row) past the frame edge. Two
           per row keeps every tile readable. */
        @media (max-width: 560px) {
          .insights-stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 860px) {
          .feat-layout { grid-template-columns: 1fr; gap: 22px; }
          .feat-nav-col { position: sticky; top: 68px; z-index: 20; background: #F7F8FA; padding: 10px 0; margin: -10px 0 0; }
          .feat-side-sticky { position: static; gap: 10px; }
          .feat-side-head h2 { display: none; }
          .feat-nav { position: static; flex-direction: row; gap: 8px; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px; }
          .feat-nav::-webkit-scrollbar { display: none; }
          .feat-group { display: contents; }
          .feat-group-label { display: none; }
          .feat-navitem { width: auto; white-space: nowrap; flex-shrink: 0; background: #fff; border: 1px solid #E2E4E9; padding: 9px 15px; font-size: 14px; }
          .feat-navitem.active { border-color: #041635; }
          .feat-swipe-hint { display: flex; align-items: center; justify-content: center; gap: 6px; margin-bottom: 16px; }
        }
      `}</style>

      <div className="feat-inner">
        <div className="feat-layout">
          {/* Mobile-only hint that the feature nav scrolls sideways */}
          <div className="feat-swipe-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9A9FA8" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            <span style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: '0.04em' }}>Swipe to explore features</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9A9FA8" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>

          {/* Grouped sidebar nav — header sticks with it so it stays visible while cards scroll past */}
          <div className="feat-nav-col">
            <div className="feat-side-sticky">
              <motion.div className="feat-side-head" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '10px', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>Everything a PDF can&apos;t do</p>
                <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(26px, 2.6vw, 32px)', fontWeight: 900, color: '#041635', lineHeight: 1.0, letterSpacing: '-0.03em' }}>
                  Built for<br />job seekers
                </h2>
              </motion.div>

              <nav className="feat-nav" aria-label="Product features">
                {FEATURE_GROUPS.map(group => (
                  <div key={group.label} className="feat-group">
                    <p className="feat-group-label" style={{ color: ACCENT[group.ids[0]]?.badge, display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '2px', background: ACCENT[group.ids[0]]?.badge, display: 'inline-block' }} />
                      {group.label}
                    </p>
                    {group.ids.map(id => {
                      const i = tabs.findIndex(t => t.id === id);
                      const t = tabs[i];
                      if (!t) return null;
                      const isActive = activeTab === i;
                      return (
                        <button key={t.id} ref={(el: HTMLButtonElement | null) => { navRefs.current[i] = el; }} onClick={() => goToFeature(i)} className={`feat-navitem${isActive ? ' active' : ''}`} aria-current={isActive}>
                          {isActive && <motion.span layoutId="featNavPill" transition={{ type: 'spring', stiffness: 450, damping: 38 }} style={{ position: 'absolute', inset: 0, background: '#EDF0F4', borderRadius: '10px', zIndex: 0 }} />}
                          <span className="feat-dot" />
                          <span>{t.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Stacked feature cards */}
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'clamp(56px, 7vw, 96px)' }}>
            {tabs.map((t, i) => (
              <motion.div key={t.id} ref={(el: HTMLDivElement | null) => { featureRefs.current[i] = el; }} className="feat-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.4 }}>
                <span className="feat-eyebrow" style={{ color: ACCENT[t.id]?.badge, background: ACCENT[t.id]?.badgeBg }}>
                  <t.icon size={13} strokeWidth={2.4} />
                  {t.label}
                </span>

                <div className="feat-visual-frame" style={{ marginTop: '14px' }}>
                  <div className="feat-visual-bar">
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => <div key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />)}
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                      <div style={{ background: '#fff', borderRadius: '5px', padding: '2px 14px', fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', border: '1px solid #E2E4E9' }}>app.reslink.io</div>
                    </div>
                  </div>
                  <div className={`feat-visual${t.tall ? ' tall' : ''}${t.auto ? ' auto' : ''}`} style={{ background: t.bg }}>
                    {t.visual}
                  </div>
                </div>

                <div className="feat-divider" />

                <div className="feat-body">
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 900, color: '#041635', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '12px', whiteSpace: 'pre-line' }}>{t.headline}</h3>
                    {t.sub && <p style={{ fontSize: '15px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{t.sub}</p>}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '4px' }}>
                    {t.bullets.map((b, bi) => (
                      <motion.li key={b} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ delay: bi * 0.08 + 0.15, duration: 0.28 }} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: '#3A3F4C', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
                        <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: ACCENT[t.id]?.bullet ?? '#041635', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={ACCENT[t.id]?.check ?? '#D8F950'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        {b}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
