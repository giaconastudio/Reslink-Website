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
  person, index, total, isActive, onActivate, videoRef, onHover, onHoverEnd,
}: {
  person: (typeof PEOPLE)[number];
  index: number;
  total: number;
  isActive: boolean;
  onActivate: (i: number, el: HTMLVideoElement | null) => void;
  videoRef?: (el: HTMLVideoElement | null) => void;
  onHover?: (i: number) => void;
  onHoverEnd?: (i: number) => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const mid = (total - 1) / 2;
  const rot = (index - mid) * 2.4; // fan the cards out from the centre

  return (
    <div
      className={`tr-card${isActive ? ' is-active' : ''}`}
      style={{ ['--rot' as string]: `${rot}deg`, zIndex: index }}
      onMouseEnter={() => onHover?.(index)}
      onMouseLeave={() => onHoverEnd?.(index)}
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
  // The six cards, in order.
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  // While the reader is hovering or has just tapped, they're in charge.
  // Hover is a boolean rather than a timed window: a pointer can rest on a
  // card indefinitely, and any timeout long enough not to interrupt that
  // would also stall the reel if mouseleave never arrived.
  const manualUntil = useRef(0);
  const hovering = useRef(false);
  // Set by a tap so the cycle carries on from the person the reader chose,
  // rather than from wherever it happened to be when they interrupted it.
  const resumeFrom = useRef<number | null>(null);
  const nudgedUntil = useRef(0);

  /* The reel introduces the team by itself — each clip plays for a few
     seconds, then hands over to the next, looping round. Without this the
     section is a row of stills waiting to be poked, which is dead on mobile
     where there's no hover to discover. Muted + playsInline is what mobile
     browsers require before they'll allow autoplay at all.
     Only runs while the reel is actually on screen. */
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const CYCLE_MS = 4500; // long enough to actually take each person in
    let timer: ReturnType<typeof setTimeout> | undefined;
    let idx = 0;
    let running = false;

    const pauseAll = (except: number) => {
      videos.current.forEach((v, j) => { if (v && j !== except) v.pause(); });
    };

    const playAt = (i: number) => {
      const v = videos.current[i];
      if (!v) return;
      pauseAll(i);
      v.currentTime = 0;
      v.play().catch(() => {});
      setActiveIndex(i);
      /* Warm the next clip so the handover isn't a black frame — the cards
         load with preload="none" to keep six videos off the initial page. */
      const next = videos.current[(i + 1) % PEOPLE.length];
      if (next && next.preload !== 'auto') next.preload = 'auto';
    };

    const step = () => {
      // Reader has the wheel — check back shortly rather than cutting in.
      if (hovering.current || performance.now() < manualUntil.current) {
        timer = setTimeout(step, 600);
        return;
      }
      if (resumeFrom.current != null) {
        idx = resumeFrom.current;
        resumeFrom.current = null;
      }
      playAt(idx);
      idx = (idx + 1) % PEOPLE.length;
      timer = setTimeout(step, CYCLE_MS);
    };

    /* Start straight away and let the observer *pause* it when the reel
       scrolls away, rather than relying on the observer to start it. If it
       were the trigger, anything that stopped it firing would leave the reel
       permanently frozen; this way the worst case is that it plays to an
       empty screen for a moment. */
    running = true;
    step();

    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting && !running) {
          running = true;
          step();
        } else if (!e.isIntersecting && running) {
          running = false;
          clearTimeout(timer);
          pauseAll(-1);
          setActiveIndex(null);
        }
      }
    }, { threshold: 0.35 });
    io.observe(row);

    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);

  // Hover takes over on desktop; the cycle resumes shortly after the pointer
  // leaves. On touch there's no hover, so this never fires there.
  const handleHover = (i: number) => {
    hovering.current = true;
    const v = videos.current[i];
    if (!v) return;
    videos.current.forEach((o, j) => { if (o && j !== i) o.pause(); });
    v.currentTime = 0;
    v.play().catch(() => {});
    setActiveIndex(i);
  };
  const handleHoverEnd = (i: number) => {
    hovering.current = false;
    videos.current[i]?.pause();
    manualUntil.current = performance.now() + 1200; // let the cycle pick up again
  };

  /* The strip follows whoever is playing, so the clip being shown is always
     on screen. This replaced a constant drift: the drift moved independently
     of the cycle, so the playing card regularly sat off the side of a phone
     while a face nobody could see did the talking. Only kicks in when the row
     is actually scrollable, which on desktop it never is. */
  useEffect(() => {
    const row = rowRef.current;
    if (row == null || activeIndex == null) return;
    /* Test that the row is a scroll container, not merely that its content is
       wider: the rotated cards overhang by ~80px on desktop, where overflow-x
       is visible and scrolling it means nothing. */
    const overflowX = getComputedStyle(row).overflowX;
    if (overflowX !== 'auto' && overflowX !== 'scroll') return;
    if (row.scrollWidth <= row.clientWidth) return;
    // Don't yank the strip out from under a thumb mid-swipe.
    if (performance.now() < nudgedUntil.current) return;

    const card = row.querySelectorAll<HTMLElement>('.tr-card')[activeIndex];
    if (!card) return;

    const centred = card.offsetLeft - (row.clientWidth - card.offsetWidth) / 2;
    const max = row.scrollWidth - row.clientWidth;
    const left = Math.max(0, Math.min(centred, max));

    /* Feature-detected rather than assumed: where smooth scrolling isn't
       supported (iOS Safari before 15.4), scrollTo with a behavior option is
       silently ignored — which would leave the playing card off-screen, the
       very thing this exists to prevent. Jumping is worse than gliding but
       far better than not moving. */
    const smooth = typeof document !== 'undefined'
      && 'scrollBehavior' in document.documentElement.style
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (smooth) row.scrollTo({ left, behavior: 'smooth' });
    else row.scrollLeft = left;
  }, [activeIndex]);

  // A swipe hands control back to the reader for a few seconds.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const nudge = () => { nudgedUntil.current = performance.now() + 4000; };
    row.addEventListener('touchstart', nudge, { passive: true });
    row.addEventListener('touchmove', nudge, { passive: true });
    return () => {
      row.removeEventListener('touchstart', nudge);
      row.removeEventListener('touchmove', nudge);
    };
  }, []);

  const activate = (i: number, el: HTMLVideoElement | null) => {
    // One clip at a time — stop whatever else is running first.
    rowRef.current?.querySelectorAll('video').forEach(v => { if (v !== el) v.pause(); });
    if (!el) return;

    // Tapping the one that's already playing stops it, and hands the reel
    // straight back to the cycle.
    if (activeIndex === i && !el.paused) {
      el.pause();
      setActiveIndex(null);
      manualUntil.current = 0;
      return;
    }

    /* Hold the cycle off for however long this clip actually runs, so a
       deliberate tap gets watched to the end instead of being pulled onto
       someone else partway through. Clips here run 11-18s, so a fixed window
       would cut some of them short. duration is NaN until metadata loads. */
    const hold = (ms: number) => { manualUntil.current = performance.now() + ms + 1_500; };
    if (Number.isFinite(el.duration) && el.duration > 0) {
      hold(el.duration * 1000);
    } else {
      /* Cards load with preload="none", so duration is still NaN on the first
         tap. Start on a sensible guess and correct it the moment metadata
         lands, which is well before the guess would have run out. */
      hold(15_000);
      el.addEventListener('loadedmetadata', () => {
        if (Number.isFinite(el.duration) && el.duration > 0) hold(el.duration * 1000);
      }, { once: true });
    }
    resumeFrom.current = (i + 1) % PEOPLE.length;

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
            /* No snapping: the reel scrolls itself to whoever is playing, and
               snap points fight a programmatic scrollTo, landing it on the
               neighbouring card instead. */
            scroll-snap-type: none;
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
            videoRef={el => { videos.current[i] = el; }}
            onHover={handleHover}
            onHoverEnd={handleHoverEnd}
          />
        ))}
      </div>
    </>
  );
}
