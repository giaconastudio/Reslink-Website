'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Person = {
  id: string;
  video: string;
  objectPosition: string;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
};

const JOBSEEKER_PEOPLE: Person[] = [
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

// B2B pathway variant — same card mechanic, pointed at the two other
// organization types that land on the companies page looking for
// something other than direct hiring.
const B2B_PEOPLE: Person[] = [
  {
    id: 'agencies',
    video: '/videos/agency-recruiter.mp4',
    objectPosition: '50% 22%',
    eyebrow: 'For recruitment agencies',
    title: 'Placing candidates faster, with proof clients can watch.',
    body: 'Screen and shortlist with video from day one, then hand clients a Reslink instead of a stack of PDFs they have to take your word for.',
    href: '/agencies',
  },
  {
    id: 'universities',
    video: '/videos/university-campus.mp4',
    objectPosition: '50% 30%',
    eyebrow: 'For universities & career centers',
    title: 'Giving every student a placement edge, at scale.',
    body: 'Equip your career center with a tool that helps students stand out in a crowded market, and shows administrators the outcomes to prove it.',
    href: '/universities',
  },
];

function AccordionCard({ person, expanded, onEnter, onLeave }: {
  person: Person;
  expanded: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play whichever card is expanded (including the one expanded by default
  // on mount, e.g. the first card on mobile where there's no hover) and
  // pause + reset the rest back to a still frame.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (expanded) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 1.2;
    }
  }, [expanded]);

  // Mobile browsers largely ignore preload="auto" until playback is actually
  // attempted, which is why the frame never appeared until a tap. autoPlay
  // (allowed since the video is muted + playsInline) forces that first
  // decode to happen immediately. Once a frame is in, seek to a nicer one —
  // and only freeze it there if this card isn't the one that should already
  // be playing (the expanded effect above otherwise races with this).
  const onLoadedData = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 1.2;
    if (!expanded) v.pause();
  }, [expanded]);

  return (
    <div
      className={`as-acc-card${expanded ? ' expanded' : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onEnter}
    >
      <video
        ref={videoRef}
        src={person.video}
        autoPlay muted loop playsInline preload="auto"
        onLoadedData={onLoadedData}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: person.objectPosition }}
      />
      <div className="as-acc-scrim" />

      <div className="as-acc-content">
        <p className="as-acc-eyebrow">{person.eyebrow}</p>
        {expanded && (
          <div className="as-acc-expand">
            <h3 className="as-acc-title">{person.title}</h3>
            <p className="as-acc-desc">{person.body}</p>
            <Link href={person.href} className="as-acc-pill">
              Learn more <ArrowRight size={13} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

interface Props {
  variant?: 'jobseekers' | 'b2b';
}

/** Fruitful-style horizontal accordion — real people you can bring to life by
 *  hovering, one card expanded at a time revealing a "Learn more" overlay.
 *  Covers the students/veterans gap left by the top nav (which now only
 *  links Job Seekers / Companies directly). The b2b variant reuses the same
 *  mechanic to route companies-page visitors who are actually a recruitment
 *  agency or a university toward their own dedicated pages. */
export default function AudienceStories({ variant = 'jobseekers' }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const expandedIndex = hovered ?? 0;
  const people = variant === 'b2b' ? B2B_PEOPLE : JOBSEEKER_PEOPLE;
  const eyebrow = variant === 'b2b' ? 'Not hiring directly?' : 'Every path is different';
  const heading = variant === 'b2b' ? 'We work with agencies and schools, too.' : 'Built for every kind of story.';

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
          .as-acc-card { min-width: 0; flex: 0 0 140px !important; transition: flex-basis 0.4s ease; }
          .as-acc-card.expanded { flex-basis: 320px !important; }
        }
      `}</style>

      <div className="as-inner">
        <div className="as-head">
          <motion.div className="as-head-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>{eyebrow}</p>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, color: '#041635', lineHeight: 0.96, letterSpacing: '-0.03em' }}>
              {heading}
            </h2>
          </motion.div>
        </div>

        <div className="as-strip">
          {people.map((p, i) => (
            <AccordionCard
              key={p.id}
              person={p}
              expanded={expandedIndex === i}
              onEnter={() => setHovered(i)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
