'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const PEOPLE = [
  {
    id: 'students',
    video: '/videos/student.mp4',
    eyebrow: 'For students',
    title: 'Landing your first role, without years of experience.',
    body: 'No work history yet? A video pitch lets you sell your potential, coursework, and drive in a way a blank resume never could.',
    href: '/students',
  },
  {
    id: 'veterans',
    video: '/videos/military.mp4',
    eyebrow: 'For veterans',
    title: 'Translating your service into civilian language.',
    body: 'Show recruiters the leadership and skills behind your military title, in your own words, before they ever open your resume.',
    href: '/veterans',
  },
];

function PersonCard({ person }: { person: typeof PEOPLE[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const onEnter = () => {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  };
  const onLeave = () => {
    setHovered(false);
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
    <div className="as-card" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className="as-media">
        <video
          ref={videoRef}
          src={person.video}
          muted loop playsInline preload="auto"
          onLoadedData={onLoadedData}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.6s ease' }}
        />
        <div className="as-media-scrim" />
        <p className="as-eyebrow">{person.eyebrow}</p>
      </div>
      <div className="as-body">
        <h3 className="as-title">{person.title}</h3>
        <p className="as-desc">{person.body}</p>
        <Link href={person.href} className="as-link">
          Learn more <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

/** Two real people you can bring to life by hovering — paused video acts as
 *  the photo, playing on hover. Covers the students/veterans gap left by the
 *  top nav (which now only links Job Seekers / Companies directly). */
export default function AudienceStories() {
  return (
    <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
      <style>{`
        .as-inner { max-width: 1080px; margin: 0 auto; }
        .as-head { text-align: center; max-width: 620px; margin: 0 auto clamp(48px, 6vw, 68px); }
        .as-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 760px) { .as-grid { grid-template-columns: 1fr; } }

        .as-card { border-radius: 20px; overflow: hidden; border: 1px solid #ECEEF1; box-shadow: 0 4px 24px rgba(4,22,53,0.06); background: #fff; }
        .as-media { position: relative; aspect-ratio: 4/3; overflow: hidden; background: #060D24; }
        .as-media-scrim { position: absolute; inset: 0; background: linear-gradient(to top, rgba(4,22,53,0.55) 0%, rgba(4,22,53,0.05) 45%, transparent 70%); pointer-events: none; }
        .as-eyebrow {
          position: absolute; bottom: 16px; left: 18px; z-index: 1;
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          color: #fff; font-family: var(--font-body);
        }
        .as-body { padding: clamp(22px, 3vw, 28px); }
        .as-title { font-family: var(--font-phudu); font-size: clamp(20px, 2.2vw, 25px); font-weight: 900; color: #041635; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 10px; }
        .as-desc { font-size: 14px; color: #5C6070; line-height: 1.65; font-family: var(--font-body); margin-bottom: 16px; }
        .as-link { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 700; color: #0C63E3; text-decoration: none; }
        .as-link svg { transition: transform 0.18s ease; }
        .as-link:hover svg { transform: translateX(3px); }
      `}</style>

      <div className="as-inner">
        <motion.div className="as-head" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Every path is different</p>
          <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, color: '#041635', lineHeight: 0.96, letterSpacing: '-0.03em' }}>
            Built for every kind of story.
          </h2>
        </motion.div>

        <div className="as-grid">
          {PEOPLE.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ delay: i * 0.08, duration: 0.4 }}>
              <PersonCard person={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
