'use client';

import { motion } from 'framer-motion';

/* "You apply, and then nothing." — a dark banner. The visual is a grid of
   applications where almost every one went unanswered: a single lime square
   (a reply) sits amid a sea of empty ones (never heard back). */
const COLS = 14;
const ROWS = 7;
const TOTAL = COLS * ROWS; // 98
const REPLIED_INDEX = 3 * COLS + 10; // middle row, towards the right

export default function ApplyNothing() {
  return (
    <section style={{ background: '#F5F7FA', padding: 'clamp(28px, 4vw, 48px) 24px' }}>
      <style>{`
        .an-card { max-width: 1120px; margin: 0 auto; border-radius: 24px; overflow: hidden; position: relative; padding: clamp(36px, 5vw, 60px); background: radial-gradient(ellipse 55% 100% at 2% 0%, rgba(214,61,157,0.42), transparent 55%), linear-gradient(130deg, #0C2150 0%, #0A1430 55%, #0C1F45 100%); }
        .an-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 5vw, 64px); align-items: center; }
        .an-h2 { font-family: var(--font-phudu); font-size: clamp(30px, 3.6vw, 44px); font-weight: 900; color: #fff; line-height: 1.04; letter-spacing: -0.02em; margin: 0 0 18px; }
        .an-sub { font-size: 17px; color: rgba(255,255,255,0.6); line-height: 1.7; font-family: var(--font-body); max-width: 440px; margin: 0; }

        .an-squares { display: grid; grid-template-columns: repeat(${COLS}, 1fr); gap: 7px; }
        .an-sq { aspect-ratio: 1; border-radius: 6px; border: 1px solid rgba(255,255,255,0.11); background: rgba(255,255,255,0.02); }
        .an-sq.on { background: #D7FF43; border-color: #D7FF43; animation: an-pulse 1.9s ease-in-out infinite; }
        @keyframes an-pulse { 0%, 100% { box-shadow: 0 0 11px rgba(215,255,67,0.3); } 50% { box-shadow: 0 0 22px rgba(215,255,67,0.7); } }
        .an-legend { display: flex; gap: 26px; margin-top: 22px; align-items: center; flex-wrap: wrap; }
        .an-leg { display: inline-flex; align-items: center; gap: 9px; font-size: 13px; color: rgba(255,255,255,0.55); font-family: var(--font-body); }
        .an-leg b { color: #fff; font-weight: 700; }
        .an-chip { width: 15px; height: 15px; border-radius: 5px; border: 1px solid rgba(255,255,255,0.25); flex-shrink: 0; }
        .an-chip.on { background: #D7FF43; border-color: #D7FF43; }

        @media (max-width: 820px) { .an-grid { grid-template-columns: 1fr; gap: 36px; } .an-sub { max-width: none; } }
      `}</style>
      <motion.div className="an-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5 }}>
        <div className="an-grid">
          <div>
            <h2 className="an-h2">You apply, and<br />then nothing</h2>
            <p className="an-sub">Most resumes are never opened. You don’t get rejected, you just get nothing back. So you never learn what to fix.</p>
          </div>
          <div>
            <motion.div
              className="an-squares"
              variants={{ show: { transition: { staggerChildren: 0.012 } } }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              {Array.from({ length: TOTAL }).map((_, i) => (
                <motion.span
                  key={i}
                  className={`an-sq${i === REPLIED_INDEX ? ' on' : ''}`}
                  variants={{ hidden: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1 } }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              ))}
            </motion.div>
            <div className="an-legend">
              <span className="an-leg"><span className="an-chip on" /> <b>1</b> replied</span>
              <span className="an-leg"><span className="an-chip" /> <b>{TOTAL - 1}</b> never heard back</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
