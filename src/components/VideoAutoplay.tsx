'use client';

import { useEffect } from 'react';

/* Site-wide autoplay recovery.

   The symptom: type reslink.io into desktop Safari and EVERY video is frozen
   on its poster. Click anything at all — a link, the logo, empty page
   background — and they all start at once. Chrome is fine; mobile Safari is
   fine because a touch arrives within moments anyway.

   "All of them, released together by any gesture" is the signature of autoplay
   being gated on user activation for the whole page, rather than anything
   wrong with an individual element. Worth stating what it is NOT: this machine
   has no Safari per-site preference set (PerSitePreferences.db doesn't exist)
   and no autoplay pref key, so Safari is running its stock default. This is not
   a setting anyone toggled — real visitors get the same thing.

   Retrying inside one component only ever fixed that component. There are 23
   video tags across the site and most carry nothing but the autoplay
   attribute, so the fix belongs in one place that covers all of them.

   Only `video[autoplay]` is touched, which leaves most deliberately-paused
   videos alone for free: CandidateReel's frozen-frame base, the seeked preview
   on /oliviastone, HowItWorks' step clips and TeamReel's hover clips all omit
   the attribute and drive playback themselves.

   The attribute alone isn't sufficient, though. AudienceStories both sets
   autoPlay (to force a first decode on mobile) and then deliberately pauses
   the collapsed card at currentTime 1.2 as a still frame. Since this kicker
   re-runs on every gesture and scroll, it would keep dragging that card back
   into playback and fight the component. Hence the opt-out: anything driving
   its own play/pause while still needing the autoplay attribute marks itself
   data-autoplay-managed and is skipped.

   A `currentTime !== 0` heuristic would look like it worked here and then
   silently fail for a managed video that had never played. */
const SELECTOR = 'video[autoplay]:not([data-autoplay-managed])';
export default function VideoAutoplay() {
  useEffect(() => {
    const kick = () => {
      document.querySelectorAll<HTMLVideoElement>(SELECTOR).forEach(v => {
        if (!v.paused) return;
        /* muted is what makes unattended playback permissible at all; the
           attribute can be lost across hydration, so assert it here. */
        v.muted = true;
        const p = v.play();
        if (p && typeof p.catch === 'function') p.catch(() => { /* still gated — a later gesture retries */ });
      });
    };

    kick();

    /* The listeners stay for the life of the page rather than detaching after
       the first hit. They're passive and cost nothing, and leaving them on is
       what covers videos mounted later by a client-side navigation, plus tabs
       restored from the back/forward cache. */
    const gestures = ['pointerdown', 'keydown', 'touchstart', 'scroll'] as const;
    gestures.forEach(e => window.addEventListener(e, kick, { passive: true }));

    /* A background tab can have playback deferred until it's foregrounded. */
    document.addEventListener('visibilitychange', kick);
    window.addEventListener('pageshow', kick);

    return () => {
      gestures.forEach(e => window.removeEventListener(e, kick));
      document.removeEventListener('visibilitychange', kick);
      window.removeEventListener('pageshow', kick);
    };
  }, []);

  return null;
}
