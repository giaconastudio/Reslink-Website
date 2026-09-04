'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Names/roles/videos are placeholders — swap freely.
const CANDIDATES = [
  { name: 'Zara Mitchell', role: 'Frontend Engineer', loc: 'London', video: '/videos/reel-d.mp4', frame: 4 },
  { name: 'Marcus Bell', role: 'Product Designer', loc: 'Berlin', video: '/videos/reel-a.mp4', frame: 6.5 },
  { name: 'Nadia Rahman', role: 'Data Analyst', loc: 'Toronto', video: '/videos/reel-b.mp4', frame: 9 },
  { name: 'Andre Costa', role: 'Sales Lead', loc: 'Austin', video: '/videos/reel-c.mp4', frame: 5.5 },
];
const CYCLE = 5000;
const SPRING = { type: 'spring' as const, stiffness: 190, damping: 25 };
const AREA = ['main', 's1', 's2', 's3']; // slot 0 = big-left, 1/2/3 = right top→bottom

// A paused, seeked <video> — a frozen frame of the person (persistent base, so a card never flashes blank).
function FrozenFrame({ src, t = 1 }: { src: string; t?: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const seek = () => { try { v.currentTime = t; } catch { /* ignore */ } };
    v.addEventListener('loadeddata', seek);
    if (v.readyState >= 2) seek();
    return () => v.removeEventListener('loadeddata', seek);
  }, [src, t]);
  const poster = src.replace('/videos/reel-', '/videos/hero-reel-').replace('.mp4', '.jpg');
  return <video ref={ref} src={src} poster={poster} muted playsInline preload="auto" className="reel-media" />;
}

export default function CandidateReel() {
  // queue[0] plays in the main frame; each tick the top-right card takes over and the old main drops to the bottom.
  const [queue, setQueue] = useState([0, 1, 2, 3]);

  useEffect(() => {
    const t = setInterval(() => setQueue(q => [...q.slice(1), q[0]]), CYCLE);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="reel">
      <style>{`
        .reel { display: grid; grid-template-columns: 1.12fr 0.88fr; grid-template-rows: repeat(3, 1fr); grid-template-areas: "main s1" "main s2" "main s3"; gap: 16px; width: 100%; max-width: 520px; height: 462px; margin-left: auto; }
        .reel-card { position: relative; border-radius: 18px; overflow: hidden; background: #061A3A; box-shadow: 0 20px 48px rgba(6,26,58,0.18); }
        .reel-fill { position: absolute; inset: 0; }
        .reel-media { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; background: #061A3A; }
        .reel-play { animation: reelZoom ${CYCLE + 900}ms ease-out both; }
        @keyframes reelZoom { from { transform: scale(1.1); } to { transform: scale(1); } }
        .reel-playing { position: absolute; top: 12px; left: 12px; z-index: 3; display: inline-flex; align-items: center; gap: 7px; background: rgba(6,26,58,0.55); backdrop-filter: blur(6px); color: #fff; font-size: 12px; font-weight: 700; border-radius: 100px; padding: 5px 12px; font-family: var(--font-body); }
        .reel-playing i { width: 7px; height: 7px; border-radius: 50%; background: #D7FF43; }
        .reel-cap { position: absolute; left: 0; right: 0; bottom: 0; z-index: 2; padding: 30px 16px 15px; background: linear-gradient(to top, rgba(6,26,58,0.92), transparent); }
        .reel-name { font-family: var(--font-phudu); text-transform: uppercase; font-size: clamp(16px, 1.7vw, 20px); font-weight: 900; color: #fff; letter-spacing: -0.01em; margin: 0; line-height: 1; }
        .reel-role { font-size: 12px; color: rgba(255,255,255,0.72); font-family: var(--font-body); margin: 5px 0 0; }
        .reel-bar { height: 4px; border-radius: 100px; background: rgba(255,255,255,0.28); overflow: hidden; margin-top: 12px; }
        .reel-bar span { display: block; height: 100%; background: #D7FF43; border-radius: 100px; animation: reelFill ${CYCLE}ms linear forwards; }
        @keyframes reelFill { from { width: 0%; } to { width: 100%; } }
        .reel-scrim { position: absolute; inset: 0; z-index: 1; background: linear-gradient(to top, rgba(6,26,58,0.6), transparent 58%); }
        .reel-small-name { position: absolute; bottom: 12px; left: 14px; z-index: 2; color: #fff; font-size: 15px; font-weight: 700; font-family: var(--font-body); }
        @media (max-width: 860px) { .reel { max-width: 440px; height: 420px; } }
        @media (max-width: 400px) { .reel { max-width: 340px; height: 360px; } }
      `}</style>

      {queue.map((ci, slot) => {
        const c = CANDIDATES[ci];
        const isMain = slot === 0;
        return (
          <motion.div
            layout
            key={ci}
            transition={SPRING}
            className="reel-card"
            style={{ gridArea: AREA[slot] }}
          >
            {/* Persistent media base (scale-corrected by framer during the move) */}
            <motion.div layout className="reel-fill">
              <FrozenFrame src={c.video} t={c.frame} />
              {isMain && <video key={ci} src={c.video} poster={c.video.replace('/videos/reel-', '/videos/hero-reel-').replace('.mp4', '.jpg')} autoPlay muted loop playsInline preload="metadata" className="reel-media reel-play" />}
            </motion.div>

            {isMain ? (
              <>
                <span className="reel-playing"><i />Playing</span>
                <div className="reel-cap">
                  <p className="reel-name">{c.name}</p>
                  <p className="reel-role">{c.role} · {c.loc}</p>
                  <div className="reel-bar"><span /></div>
                </div>
              </>
            ) : (
              <>
                <div className="reel-scrim" />
                <span className="reel-small-name">{c.name}</span>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
