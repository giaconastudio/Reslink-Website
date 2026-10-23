'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { APP_SIGNUP_URL } from '@/lib/links';

// Four steps as a row of equal, dark demo panels. Each panel is a static,
// legible illustration of the step (no video) with its own hover animation.
// All share the same navy ground as the "Who watched" insights panel.
const steps = [
  { num: '01', time: '0:00', accent: '#D63D9D', title: 'Upload your resume', desc: 'Reslink reads it and creates a script for that specific role.' },
  { num: '02', time: '1:30', accent: '#1468E8', title: 'Record your pitch', desc: 'The teleprompter scrolls while you record. You just read it.' },
  { num: '03', time: '4:40', accent: '#5B7A0F', title: 'Share your link', desc: 'Add it to any application, email or your LinkedIn profile.' },
  { num: '04', time: 'whenever they open it', accent: '#D63D9D', title: 'See who watched', desc: 'Every recruiter who opened it and how far they got.' },
];

const WATCH_ROWS = [
  { city: 'San Francisco, CA', note: 'took your resume', pct: 87, lime: true },
  { city: 'New York, NY', note: 'watched 54%', pct: 54, lime: false },
  { city: 'Austin, TX', note: 'watched 31%', pct: 31, lime: false },
];

function Demo({ i }: { i: number }) {
  if (i === 0) {
    return (
      <div className="hiw-demo d-upload">
        <span className="hiw-cap">Upload</span>
        <div className="up-zone">
          <svg className="up-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D7FF43" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 15V3" /><path d="m7 8 5-5 5 5" /><path d="M5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
          </svg>
          <span className="up-file">Olivia-Stone-Resume.pdf</span>
          <span className="up-sub">Parsed by Reslink AI</span>
        </div>
      </div>
    );
  }
  if (i === 1) {
    return (
      <div className="hiw-demo d-record">
        <span className="hiw-cap">Record</span>
        <div className="rec-screen">
          <div className="rec-tele"><div className="rec-lines">
            <span /><span className="lime" /><span /><span className="sm" />
          </div></div>
          <div className="rec-foot">
            <span className="rec-dot" />
            <span className="rec-label">Recording</span>
            <span className="rec-time">0:22</span>
          </div>
        </div>
      </div>
    );
  }
  if (i === 2) {
    return (
      <div className="hiw-demo d-share">
        <span className="hiw-cap">Share</span>
        <div className="sh-body">
          <div className="sh-pill">
            <span className="sh-url">reslink.io/oliviastone</span>
            <span className="sh-copy">Copy</span>
          </div>
          <div className="sh-chips">
            {[
              <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
              <><path d="M9 17H7A5 5 0 0 1 7 7h2" /><path d="M15 7h2a5 5 0 0 1 0 10h-2" /><line x1="8" x2="16" y1="12" y2="12" /></>,
              <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
            ].map((paths, k) => (
              <span className="sh-chip" key={k}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{paths}</svg>
              </span>
            ))}
          </div>
          <span className="sh-note">lands in any application, email or&nbsp;DM</span>
        </div>
      </div>
    );
  }
  return (
    <div className="hiw-demo d-watch">
      <span className="hiw-cap">Who watched</span>
      <div className="watch-body">
        {WATCH_ROWS.map((r) => (
          <div className="w-row" key={r.city}>
            <div className="w-top">
              <span className="w-city">{r.city}</span>
              <span className={`w-note${r.lime ? ' lime' : ''}`}>{r.note}</span>
            </div>
            <div className="w-bar"><span className={`w-fill${r.lime ? ' lime' : ''}`} style={{ width: `${r.pct}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: '#FBEAF5', padding: 'clamp(28px, 4vw, 48px) 24px' }}>
      <style>{`
        .hiw-wrap { max-width: 1120px; margin: 0 auto; background: #fff; border-radius: 28px; padding: clamp(36px, 5vw, 64px); box-shadow: 0 30px 80px rgba(6,26,58,0.07); border: 1px solid rgba(6,26,58,0.05); }

        .hiw-head { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: clamp(28px, 5vw, 72px); align-items: center; }
        .hiw-h2 { font-family: var(--font-phudu); font-size: clamp(24px, 2.9vw, 36px); font-weight: 900; color: #061A3A; line-height: 1.02; letter-spacing: -0.03em; margin: 0; }
        .hiw-intro { max-width: 360px; }
        .hiw-eyebrow { font-family: var(--font-body); font-size: 12px; font-weight: 700; letter-spacing: 0.05em; color: #D63D9D; margin: 0 0 12px; }
        .hiw-lead { font-size: 17px; line-height: 1.6; color: #475569; font-family: var(--font-body); margin: 0; }

        .hiw-divider { border: none; border-top: 1px solid #E7EBF0; margin: clamp(28px, 4vw, 44px) 0 clamp(26px, 3.5vw, 36px); }

        .hiw-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

        /* Every demo panel: identical size, same dark ground, lift on hover */
        .hiw-demo { height: 200px; border-radius: 16px; overflow: hidden; background: linear-gradient(160deg, #0C2150 0%, #0A1733 100%); border: 1px solid rgba(255,255,255,0.07); padding: 15px 16px; display: flex; flex-direction: column; gap: 11px; transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease; }
        .hiw-demo:hover { transform: translateY(-5px); border-color: rgba(215,255,67,0.38); box-shadow: 0 22px 50px rgba(0,0,0,0.45); }
        .hiw-cap { font-family: var(--font-body); font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.42); flex-shrink: 0; }

        /* 1 — Upload */
        .up-zone { flex: 1; border: 1.5px dashed rgba(255,255,255,0.2); border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 9px; transition: border-color 0.35s ease, background 0.35s ease; }
        .d-upload:hover .up-zone { border-color: rgba(215,255,67,0.55); background: rgba(215,255,67,0.04); }
        .up-icon { transition: transform 0.35s ease; }
        .d-upload:hover .up-icon { animation: up-bounce 0.9s ease infinite; }
        @keyframes up-bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .up-file { font-family: var(--font-body); font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.9); background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 5px 11px; white-space: nowrap; }
        .up-sub { font-family: var(--font-body); font-size: 10.5px; color: rgba(255,255,255,0.4); }

        /* 2 — Record */
        .rec-screen { flex: 1; border-radius: 11px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 14px 14px 11px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; }
        .rec-tele { overflow: hidden; }
        .rec-lines { display: flex; flex-direction: column; gap: 9px; }
        .d-record:hover .rec-lines { animation: tele-scroll 2.4s ease-in-out infinite alternate; }
        @keyframes tele-scroll { from { transform: translateY(5px); } to { transform: translateY(-5px); } }
        .rec-lines span { height: 7px; border-radius: 4px; background: rgba(255,255,255,0.14); }
        .rec-lines span:nth-child(1) { width: 85%; }
        .rec-lines span.lime { width: 68%; background: #D7FF43; }
        .rec-lines span:nth-child(3) { width: 78%; }
        .rec-lines span.sm { width: 45%; }
        .rec-foot { display: flex; align-items: center; gap: 7px; }
        .rec-dot { width: 8px; height: 8px; border-radius: 50%; background: #D63D9D; flex-shrink: 0; }
        .d-record:hover .rec-dot { animation: rec-pulse 1.3s ease-in-out infinite; }
        @keyframes rec-pulse { 0%,100% { opacity: 1; box-shadow: 0 0 0 0 rgba(214,61,157,0.5); } 50% { opacity: 0.5; box-shadow: 0 0 0 4px rgba(214,61,157,0); } }
        .rec-label { font-family: var(--font-body); font-size: 11.5px; font-weight: 600; color: rgba(255,255,255,0.78); }
        .rec-time { font-family: var(--font-body); font-size: 11.5px; color: rgba(255,255,255,0.45); margin-left: auto; }

        /* 3 — Share */
        .sh-body { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 13px; }
        .sh-pill { display: flex; align-items: center; justify-content: space-between; gap: 8px; width: 100%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 6px 6px 6px 12px; }
        .sh-url { font-family: var(--font-body); font-size: 12px; color: rgba(255,255,255,0.82); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .sh-copy { flex-shrink: 0; font-family: var(--font-body); font-size: 11.5px; font-weight: 700; color: #061A3A; background: #D7FF43; border-radius: 7px; padding: 5px 12px; transition: box-shadow 0.3s ease; }
        .d-share:hover .sh-copy { box-shadow: 0 0 0 4px rgba(215,255,67,0.18); }
        .sh-chips { display: flex; gap: 9px; }
        .sh-chip { width: 34px; height: 34px; border-radius: 9px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.65); transition: transform 0.3s ease, color 0.3s ease, border-color 0.3s ease; }
        .d-share:hover .sh-chip { color: #D7FF43; border-color: rgba(215,255,67,0.4); transform: translateY(-4px); }
        .d-share:hover .sh-chip:nth-child(2) { transition-delay: 0.06s; }
        .d-share:hover .sh-chip:nth-child(3) { transition-delay: 0.12s; }
        .sh-note { font-family: var(--font-body); font-size: 10.5px; color: rgba(255,255,255,0.4); }

        /* 4 — Who watched */
        .watch-body { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 12px; }
        .w-top { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; margin-bottom: 6px; }
        .w-city { font-family: var(--font-body); font-size: 12px; font-weight: 700; color: #fff; white-space: nowrap; }
        .w-note { font-family: var(--font-body); font-size: 10.5px; color: rgba(255,255,255,0.45); white-space: nowrap; }
        .w-note.lime { color: #D7FF43; }
        .w-bar { height: 4px; border-radius: 3px; background: rgba(255,255,255,0.1); overflow: hidden; }
        .w-fill { display: block; height: 100%; border-radius: 3px; background: rgba(255,255,255,0.32); transform-origin: left; }
        .w-fill.lime { background: #D7FF43; }
        .d-watch:hover .w-fill { animation: w-refill 1s cubic-bezier(0.22,1,0.36,1); }
        @keyframes w-refill { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        .hiw-meta { padding-top: 16px; }
        .hiw-num { font-family: var(--font-body); font-size: 12px; font-weight: 700; letter-spacing: 0.01em; margin: 0 0 9px; }
        .hiw-title { font-family: var(--font-body); font-size: 18px; font-weight: 800; color: #061A3A; letter-spacing: -0.01em; margin: 0 0 7px; }
        .hiw-desc { font-family: var(--font-body); font-size: 14.5px; line-height: 1.55; color: #64748B; margin: 0; }

        @media (max-width: 920px) {
          .hiw-head { grid-template-columns: 1fr; gap: 20px; align-items: start; }
          .hiw-h2 { max-width: none; }
          .hiw-steps { grid-template-columns: repeat(2, 1fr); gap: 16px 18px; }
        }
        @media (max-width: 540px) {
          .hiw-steps { grid-template-columns: 1fr; }
        }
      `}</style>

      <motion.div
        className="hiw-wrap"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="hiw-head">
          <h2 className="hiw-h2">Five minutes to set up.<br className="br-desktop" />Then it works on its own</h2>
          <div className="hiw-intro">
            <p className="hiw-eyebrow">How it works</p>
            <p className="hiw-lead">Three steps to build it, and one that keeps telling you things long after you have sent it.</p>
          </div>
        </div>

        <hr className="hiw-divider" />

        <div className="hiw-steps">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <Demo i={i} />
              <div className="hiw-meta">
                <p className="hiw-num" style={{ color: s.accent }}>{s.num} &middot; {s.time}</p>
                <h3 className="hiw-title">{s.title}</h3>
                <p className="hiw-desc">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(34px, 4vw, 52px)' }}>
          <Link href={APP_SIGNUP_URL} className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px' }}>
            Create your free Reslink
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
