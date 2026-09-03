'use client';

import { useRef, useState } from 'react';

const PEOPLE = [
  { name: 'Zara Mitchell', role: 'Frontend Engineer', video: '/videos/reel-d.mp4', poster: '/videos/hero-reel-d.jpg', pos: '50% 28%' },
  { name: 'Marcus Bell', role: 'Product Designer', video: '/videos/reel-a.mp4', poster: '/videos/hero-reel-a.jpg', pos: '50% 22%' },
  { name: 'Daniel Chen', role: 'Business Dev Rep', video: '/videos/cta-resume.mp4', poster: '/videos/hero-cta-resume.jpg', pos: '50% 30%' },
  { name: 'Nadia Rahman', role: 'Data Analyst', video: '/videos/reel-b.mp4', poster: '/videos/hero-reel-b.jpg', pos: '50% 26%' },
  { name: 'Andre Costa', role: 'Sales Lead', video: '/videos/reel-c.mp4', poster: '/videos/hero-reel-c.jpg', pos: '50% 28%' },
  { name: 'Olivia Stone', role: 'Business Dev Rep', video: '/videos/pip-person-compressed.mp4', poster: '/videos/pip-person-poster.jpg', pos: '50% 22%' },
];

/** A single card: shows a frozen video frame (the "static image") and plays the
 *  clip on hover (desktop) or on tap (touch, where there is no hover). */
function TeamCard({
  person, index, total, isActive, onActivate,
}: {
  person: (typeof PEOPLE)[number];
  index: number;
  total: number;
  isActive: boolean;
  onActivate: (i: number, el: HTMLVideoElement | null) => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const mid = (total - 1) / 2;
  const rot = (index - mid) * 2.4; // fan the cards out from the centre

  return (
    <div
      className={`tr-card${isActive ? ' is-active' : ''}`}
      style={{ ['--rot' as string]: `${rot}deg`, zIndex: index }}
      onMouseEnter={() => { const v = ref.current; if (v) { v.currentTime = 0; v.play().catch(() => {}); } }}
      onMouseLeave={() => { ref.current?.pause(); }}
      /* Touch has no hover, so a tap is what starts the clip there. Harmless on
         desktop: the pointer is already hovering, so this just restarts it. */
      onClick={() => onActivate(index, ref.current)}
    >
      {/* Idle state is a clean still photo; the clip sits on top and fades in on hover/tap. */}
      <img
        src={person.poster}
        alt={person.name}
        className="tr-card-media"
        style={{ objectPosition: person.pos }}
      />
      <video
        ref={ref}
        src={person.video}
        muted loop playsInline preload="none"
        className="tr-card-media tr-card-vid"
        style={{ objectPosition: person.pos }}
      />
      <div className="tr-card-scrim" />
      <div className="tr-card-label">
        <p className="tr-card-name">{person.name}</p>
        <p className="tr-card-role">{person.role}</p>
      </div>
    </div>
  );
}

/** A fanned row of candidate cards. Each shows a still video frame and plays
 *  its clip on hover. Meant to be dropped into any dark section. */
export default function TeamReel() {
  // Which card a tap has started. Only used on touch, where :hover never fires,
  // so the scrim/label need a state-driven class instead.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const activate = (i: number, el: HTMLVideoElement | null) => {
    // One clip at a time — stop whatever else is running first.
    rowRef.current?.querySelectorAll('video').forEach(v => { if (v !== el) v.pause(); });
    if (!el) return;
    if (activeIndex === i && !el.paused) {
      el.pause();
      setActiveIndex(null);
      return;
    }
    el.currentTime = 0;
    el.play().catch(() => {});
    setActiveIndex(i);
  };

  return (
    <>
      <style>{`
        .tr-row { display: flex; justify-content: center; align-items: center; }
        .tr-card {
          position: relative; width: clamp(112px, 14vw, 180px); aspect-ratio: 3 / 4;
          border-radius: 18px; overflow: hidden; flex-shrink: 0;
          margin-left: -16px; border: 3px solid #0A1F45; background: #0A1F45;
          transform: rotate(var(--rot));
          box-shadow: 0 18px 42px rgba(0,0,0,0.38);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
          cursor: pointer;
        }
        .tr-card:first-child { margin-left: 0; }
        .tr-card:hover {
          transform: rotate(0deg) translateY(-12px) scale(1.06);
          z-index: 50 !important;
          box-shadow: 0 34px 66px rgba(0,0,0,0.55);
        }
        .tr-card-media { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        /* Video overlays the still and fades in only while hovered (or tapped). */
        .tr-card-vid { opacity: 0; transition: opacity 0.35s ease; }
        .tr-card:hover .tr-card-vid, .tr-card.is-active .tr-card-vid { opacity: 1; }
        .tr-card-scrim { position: absolute; inset: 0; background: linear-gradient(to top, rgba(6,26,58,0.9), rgba(6,26,58,0.1) 50%, transparent 70%); opacity: 0; transition: opacity 0.3s; pointer-events: none; }
        .tr-card:hover .tr-card-scrim, .tr-card.is-active .tr-card-scrim { opacity: 1; }
        .tr-card-label { position: absolute; left: 0; right: 0; bottom: 0; padding: 15px; opacity: 0; transform: translateY(8px); transition: opacity 0.3s, transform 0.3s; z-index: 1; pointer-events: none; }
        .tr-card:hover .tr-card-label, .tr-card.is-active .tr-card-label { opacity: 1; transform: translateY(0); }
        .tr-card-name { font-family: var(--font-phudu); font-size: 15px; font-weight: 900; color: #fff; letter-spacing: -0.01em; line-height: 1; }
        .tr-card-role { font-size: 11px; color: rgba(255,255,255,0.7); font-family: var(--font-body); margin-top: 3px; }

        /* Phones keep the desktop fan — overlapped, rotated cards — instead of
           reflowing into a 2-up grid, and become a horizontally swipeable
           strip. Full-bleed via negative margins that cancel the section's
           24px padding, so it scrolls edge to edge.
           overflow-x:auto forces overflow-y to compute as auto, which would
           clip the rotation and the hover lift, so the vertical padding here
           is what gives them room. */
        @media (max-width: 640px) {
          .tr-row {
            justify-content: flex-start;
            flex-wrap: nowrap;
            overflow-x: auto;
            margin-inline: -24px;
            padding: 22px 24px 26px;
            scroll-snap-type: x proximity;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            overscroll-behavior-x: contain;
          }
          .tr-row::-webkit-scrollbar { display: none; }
          .tr-card {
            /* Bigger than the desktop clamp's 112px floor — at 375px that
               floor made each face tiny, which is what pushed the old layout
               into a grid in the first place. */
            width: 148px;
            scroll-snap-align: center;
          }
          /* No lift on tap — a transform here would fight the scroll container. */
          .tr-card.is-active { z-index: 50; box-shadow: 0 26px 54px rgba(0,0,0,0.5); }
        }
      `}</style>
      <div className="tr-row" ref={rowRef}>
        {PEOPLE.map((p, i) => (
          <TeamCard
            key={p.name}
            person={p}
            index={i}
            total={PEOPLE.length}
            isActive={activeIndex === i}
            onActivate={activate}
          />
        ))}
      </div>
    </>
  );
}
