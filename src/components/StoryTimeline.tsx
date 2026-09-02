'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const H = 520; // desktop stage height (design px; SVG viewBox matches so nodes/cards align)
const GAP = 44; // dashed connector length from node up to card bottom

// x is a % of the stage width so it stays aligned with the cards; nodeY is design px.
const MS = [
  {
    xPct: 12.5, nodeY: 440, color: '#C7CBD3', halo: 'rgba(199,203,211,0.35)',
    date: '2023', chip: 'The spark', chipBg: '#EEF0F3', chipFg: '#5C6070',
    title: 'Reslink was born', dark: false, nodeDelay: 0.22, connDelay: 0.32, cardDelay: 0.4,
    body: <>Dominic kept getting overlooked. Qualified, but reduced to bullet points. So he built the first version for himself.</>,
  },
  {
    xPct: 37.5, nodeY: 396, color: '#1468E8', halo: 'rgba(20,104,232,0.22)',
    date: '2024', chip: 'Launch', chipBg: '#DCEAFF', chipFg: '#1468E8',
    title: 'Anyone can record', dark: false, nodeDelay: 0.64, connDelay: 0.74, cardDelay: 0.8,
    body: <>The first version shipped: a video intro, a resume and a portfolio behind <strong>one link</strong>, with tracking so you know who watched.</>,
  },
  {
    xPct: 62.5, nodeY: 352, color: '#D63D9D', halo: 'rgba(214,61,157,0.20)',
    date: '2025', chip: 'Forces join', chipBg: '#FBEAF5', chipFg: '#D63D9D',
    title: 'Three founders', dark: false, nodeDelay: 1.04, connDelay: 1.14, cardDelay: 1.2,
    body: <>Roxanne and Joana joined from the other side of the same problem, after years coaching job seekers through <strong>TechTalk</strong>.</>,
  },
  {
    xPct: 87.5, nodeY: 308, color: '#C2E532', halo: 'rgba(194,229,50,0.30)',
    date: '2026', chip: 'Next', chipBg: '#D7FF43', chipFg: '#061A3A',
    title: "Building for what's next", dark: true, nodeDelay: 1.44, connDelay: 1.54, cardDelay: 1.6,
    body: <>Dan London joined as COO and Taylor Bagwell as CTO, and Reslink 2.0 launched: candidates make their case, companies see who&rsquo;s worth meeting.</>,
  },
];

function CardInner({ m }: { m: typeof MS[number] }) {
  return (
    <>
      <p className="tl-date">{m.date}</p>
      <span className="tl-chip" style={{ background: m.chipBg, color: m.chipFg }}>{m.chip}</span>
      <h3 className="tl-title">{m.title}</h3>
      <p className="tl-body">{m.body}</p>
    </>
  );
}

export default function StoryTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section style={{ background: '#F6F7F9', padding: 'clamp(72px, 9vw, 112px) 24px', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', top: '-60px', right: '-40px', width: '560px', height: '460px', background: 'radial-gradient(ellipse at center, rgba(194,229,50,0.16), transparent 66%)', pointerEvents: 'none' }} />
      <style>{`
        .tl-cards, .tl-title, .tl-body, .tl-date, .tl-chip { }
        .tl-card { border-radius: 16px; padding: clamp(18px, 1.6vw, 24px); background: #fff; border: 1px solid #ECEEF1; box-shadow: 0 16px 38px rgba(6,26,58,0.10); }
        .tl-card.dark { background: #061A3A; border-color: #061A3A; }
        .tl-date { font-size: 12px; font-weight: 600; color: #9AA1AE; letter-spacing: 0.06em; font-family: var(--font-body); margin-bottom: 12px; }
        .tl-card.dark .tl-date { color: rgba(255,255,255,0.5); }
        .tl-chip { display: inline-block; font-size: 10.5px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; border-radius: 100px; padding: 4px 11px; margin-bottom: 14px; font-family: var(--font-body); }
        .tl-title { font-family: var(--font-phudu); font-size: clamp(17px, 1.5vw, 21px); font-weight: 900; text-transform: uppercase; color: #061A3A; line-height: 1.02; letter-spacing: -0.02em; margin-bottom: 12px; }
        .tl-card.dark .tl-title { color: #fff; }
        .tl-body { font-size: 14px; color: #5C6070; line-height: 1.6; font-family: var(--font-body); }
        .tl-card.dark .tl-body { color: rgba(255,255,255,0.68); }
        .tl-body strong { color: #061A3A; font-weight: 700; }
        .tl-card.dark .tl-body strong { color: #fff; }

        .tl-stage { position: relative; height: ${H}px; max-width: 1200px; margin: 0 auto; }
        .tl-wave { position: absolute; inset: 0; width: 100%; height: 100%; }
        .tl-cardpos { position: absolute; transform: translateX(-50%); width: 23%; min-width: 218px; }
        .tl-conn { position: absolute; width: 0; border-left: 2px dashed #CDD3DD; z-index: 1; }
        .tl-nodepos { position: absolute; transform: translate(-50%, -50%); z-index: 3; }
        .tl-node { width: 26px; height: 26px; border-radius: 50%; background: #fff; border-style: solid; border-width: 4px; display: flex; align-items: center; justify-content: center; }

        .tl-mobile { display: none; }
        @media (max-width: 980px) {
          .tl-stage { display: none; }
          .tl-mobile { display: flex; flex-direction: column; gap: 14px; max-width: 460px; margin: 0 auto; }
        }
      `}</style>

      <div ref={ref} style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(24px, 3vw, 40px)' }}
        >
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Our story</p>
          <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.6vw, 58px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
            How we got here
          </h2>
          <p style={{ fontSize: 'clamp(15px, 1.7vw, 18px)', color: '#5C6070', lineHeight: 1.6, fontFamily: 'var(--font-body)', maxWidth: '520px', margin: '18px auto 0' }}>
            One person kept getting skipped over. That turned into a product, then a team, then a way of applying.
          </p>
        </motion.div>

        {/* ── Desktop: cards above, wave below ── */}
        <div className="tl-stage">
          <svg className="tl-wave" viewBox={`0 0 1000 ${H}`} preserveAspectRatio="none" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="tlGrad" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#061A3A" />
                <stop offset="0.68" stopColor="#061A3A" />
                <stop offset="0.9" stopColor="#5E8C1F" />
                <stop offset="1" stopColor="#8DC63F" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,462 C60,456 92,440 125,440 C182,440 202,488 262,488 C322,488 330,396 375,396 C432,396 448,430 502,428 C560,426 578,352 625,352 C688,352 702,388 742,386 C802,384 828,308 875,308 C930,308 972,296 1000,292"
              stroke="url(#tlGrad)" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.7, ease: [0.4, 0, 0.2, 1] }}
            />
          </svg>

          {/* dashed connectors (card bottom → node) */}
          {MS.map((m) => (
            <motion.div
              key={`c${m.xPct}`}
              className="tl-conn"
              style={{ left: `${m.xPct}%`, top: `${m.nodeY - GAP}px`, height: `${GAP}px` }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.35, delay: m.connDelay }}
            />
          ))}

          {/* cards, anchored by their bottom just above each node */}
          {MS.map((m) => (
            <div key={`card${m.xPct}`} className="tl-cardpos" style={{ left: `${m.xPct}%`, bottom: `${H - (m.nodeY - GAP)}px` }}>
              <motion.div
                className={`tl-card${m.dark ? ' dark' : ''}`}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: m.cardDelay, ease: [0.22, 1, 0.36, 1] }}
              >
                <CardInner m={m} />
              </motion.div>
            </div>
          ))}

          {/* nodes pop as the line reaches them */}
          {MS.map((m) => (
            <div key={`node${m.xPct}`} className="tl-nodepos" style={{ left: `${m.xPct}%`, top: `${m.nodeY}px` }}>
              <motion.div
                className="tl-node"
                style={{ borderColor: m.color, boxShadow: `0 0 0 6px ${m.halo}` }}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.45, delay: m.nodeDelay, ease: [0.34, 1.7, 0.6, 1] }}
              >
                <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: m.color }} />
              </motion.div>
            </div>
          ))}
        </div>

        {/* ── Mobile: simple stacked cards ── */}
        <div className="tl-mobile">
          {MS.map((m) => (
            <motion.div
              key={`m${m.xPct}`}
              className={`tl-card${m.dark ? ' dark' : ''}`}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + MS.indexOf(m) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <CardInner m={m} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
