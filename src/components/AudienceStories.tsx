'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const PEOPLE = [
  {
    id: 'students',
    video: '/videos/student.mp4',
    objectPosition: '46% 32%',
    eyebrow: 'For students',
    title: 'Landing your first role, without years of experience.',
    body: 'No work history yet? A video pitch lets you sell your potential, coursework, and drive in a way a blank resume never could.',
    href: '/students',
  },
  {
    id: 'veterans',
    video: '/videos/military.mp4',
    objectPosition: '58% 28%',
    eyebrow: 'For veterans',
    title: 'Translating your service into civilian language.',
    body: 'Show recruiters the leadership and skills behind your military title, in your own words, before they ever open your resume.',
    href: '/veterans',
  },
];

function AccordionCard({ person, expanded, onEnter, onLeave }: {
  person: typeof PEOPLE[0];
  expanded: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    onEnter();
    videoRef.current?.play().catch(() => {});
  };
  const handleLeave = () => {
    onLeave();
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 1.2;
  };
  // Seek to a real frame once loaded so the card shows a photo, not a black box, before any hover.
  const onLoadedData = useCallback(() => {
    const v = videoRef.current;
    if (v) v.currentTime = 1.2;
  }, []);

  return (
    <div
      className={`as-acc-card${expanded ? ' expanded' : ''}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleEnter}
    >
      <video
        ref={videoRef}
        src={person.video}
        muted loop playsInline preload="auto"
        onLoadedData={onLoadedData}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: person.objectPosition }}
      />
      <div className="as-acc-scrim" />

      <div className="as-acc-content">
        <p className="as-acc-eyebrow">{person.eyebrow}</p>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.28 }}
              className="as-acc-expand"
            >
              <h3 className="as-acc-title">{person.title}</h3>
              <p className="as-acc-desc">{person.body}</p>
              <Link href={person.href} className="as-acc-pill">
                Learn more <ArrowRight size={13} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Fruitful-style horizontal accordion — real people you can bring to life by
 *  hovering, one card expanded at a time revealing a "Learn more" overlay.
 *  Covers the students/veterans gap left by the top nav (which now only
 *  links Job Seekers / Companies directly). */
export default function AudienceStories() {
  const [hovered, setHovered] = useState<number | null>(null);
  const expandedIndex = hovered ?? 0;

  return (
    <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
      <style>{`
        .as-inner { max-width: 1080px; margin: 0 auto; }
        .as-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: clamp(36px, 5vw, 52px); flex-wrap: wrap; }
        .as-head-text { max-width: 560px; }

        .as-strip { display: flex; gap: 12px; height: clamp(360px, 42vw, 480px); }
        .as-acc-card {
          position: relative; flex: 1; min-width: 64px; border-radius: 20px; overflow: hidden;
          cursor: pointer; background: #060D24;
          transition: flex-grow 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .as-acc-card.expanded { flex-grow: 4.2; }
        .as-acc-scrim {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(4,22,53,0.88) 0%, rgba(4,22,53,0.25) 40%, rgba(4,22,53,0.05) 65%, transparent 80%);
          pointer-events: none;
        }
        .as-acc-content { position: absolute; left: 0; right: 0; bottom: 0; padding: 20px; z-index: 1; }
        .as-acc-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          color: #fff; font-family: var(--font-body); white-space: nowrap;
        }
        .as-acc-expand { margin-top: 10px; max-width: 380px; }
        .as-acc-title {
          font-family: var(--font-phudu); font-size: clamp(19px, 2vw, 24px); font-weight: 900;
          color: #fff; letter-spacing: -0.02em; line-height: 1.12; margin-bottom: 8px;
        }
        .as-acc-desc { font-size: 13.5px; color: rgba(255,255,255,0.78); line-height: 1.6; font-family: var(--font-body); margin-bottom: 14px; }
        .as-acc-pill {
          display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700;
          color: #041635; background: #D8F950; text-decoration: none; border-radius: 100px; padding: 9px 16px;
        }

        @media (max-width: 760px) {
          .as-strip { flex-direction: column; height: auto; gap: 14px; }
          .as-acc-card { min-width: 0; height: 140px; flex-grow: 1 !important; }
          .as-acc-card.expanded { height: 320px; }
        }
      `}</style>

      <div className="as-inner">
        <div className="as-head">
          <motion.div className="as-head-text" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Every path is different</p>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, color: '#041635', lineHeight: 0.96, letterSpacing: '-0.03em' }}>
              Built for every kind of story.
            </h2>
          </motion.div>
        </div>

        <motion.div className="as-strip" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.4 }}>
          {PEOPLE.map((p, i) => (
            <AccordionCard
              key={p.id}
              person={p}
              expanded={expandedIndex === i}
              onEnter={() => setHovered(i)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
