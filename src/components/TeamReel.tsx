'use client';

import { useEffect, useRef, useState } from 'react';

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
  person, index, total, isActive, onActivate, videoRef, clone,
}: {
  person: (typeof PEOPLE)[number];
  index: number;
  total: number;
  isActive: boolean;
  onActivate: (i: number, el: HTMLVideoElement | null) => void;
  videoRef?: (el: HTMLVideoElement | null) => void;
  clone?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const mid = (total - 1) / 2;
  const rot = (index - mid) * 2.4; // fan the cards out from the centre

  return (
    <div
      className={`tr-card${isActive ? ' is-active' : ''}${clone ? ' tr-clone' : ''}`}
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
        loading={clone ? 'lazy' : undefined}
        className="tr-card-media"
        style={{ objectPosition: person.pos }}
      />
      <video
        ref={el => { ref.current = el; videoRef?.(el); }}
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
  const firstVideo = useRef<HTMLVideoElement | null>(null);
  // Auto-advance pauses while a clip is playing and for a moment after the
  // reader swipes, so it never fights them for control of the strip.
  const paused = useRef(false);
  const nudgedUntil = useRef(0);

  /* The first clip plays by itself once the reel is on screen, so the section
     has motion in it the moment the page opens rather than looking like a row
     of stills waiting to be poked. Muted + playsInline, which is what mobile
     browsers require before they'll allow autoplay. */
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const v = firstVideo.current;
        if (v) { v.play().then(() => setActiveIndex(0)).catch(() => {}); }
        io.disconnect();
      }
    }, { threshold: 0.35 });
    io.observe(row);
    return () => io.disconnect();
  }, []);

  /* Mobile strip drifts on its own. Driving scrollLeft rather than animating a
     transform keeps the container a real scroller, so a thumb-swipe still
     works and simply interrupts the drift. The card list is rendered twice;
     rewinding by half the width at the seam makes the loop continuous. */
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    if (!window.matchMedia('(max-width: 640px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let last = performance.now();
    const SPEED = 26; // px per second

    const tick = (now: number) => {
      /* Clamped: browsers suspend rAF entirely while the tab is backgrounded,
         so the first frame after the reader comes back reports however long
         they were away. Unclamped that lurches the strip forward by hundreds
         of pixels in one frame. A cap of ~3 frames' worth just resumes. */
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!paused.current && now > nudgedUntil.current) {
        row.scrollLeft += SPEED * dt;
        const half = row.scrollWidth / 2;
        if (half > 0 && row.scrollLeft >= half) row.scrollLeft -= half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Any manual interaction wins for a few seconds.
    const nudge = () => { nudgedUntil.current = performance.now() + 3500; };
    row.addEventListener('touchstart', nudge, { passive: true });
    row.addEventListener('touchmove', nudge, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      row.removeEventListener('touchstart', nudge);
      row.removeEventListener('touchmove', nudge);
    };
  }, []);

  // Hold the strip still while a clip is playing so it can actually be watched.
  useEffect(() => { paused.current = activeIndex !== null; }, [activeIndex]);

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
        /* The duplicate pass exists only for the phone marquee's seam. */
        .tr-clone { display: none; }
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
          .tr-clone { display: block; }
          /* Snapping would fight the drift — it keeps yanking the strip back
             to the nearest card. The reel scrolls freely instead. */
          .tr-row { scroll-snap-type: none; }
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
            videoRef={i === 0 ? el => { firstVideo.current = el; } : undefined}
          />
        ))}
        {/* Second pass of the same faces. Only the phone layout shows it, and
            only so the auto-drift has something to run into at the seam. */}
        {PEOPLE.map((p, i) => (
          <TeamCard
            key={`clone-${p.name}`}
            person={p}
            index={i}
            total={PEOPLE.length}
            isActive={false}
            onActivate={activate}
            clone
          />
        ))}
      </div>
    </>
  );
}
