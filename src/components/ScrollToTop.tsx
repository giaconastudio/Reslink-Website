'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  // The browser's native scroll restoration remembers a scroll offset per
  // history entry and silently re-applies it on reload (and sometimes on
  // Next's client-side pushState navigations too), which fights with the
  // reset below and can land a fresh page load or a page-switch mid-scroll.
  // Disable it once so every navigation is driven by this component instead.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // A stray #hash from a previous page (e.g. "See how it works") shouldn't
    // follow into a fresh page load/navigation — clear it and force the top
    // unconditionally. Re-asserted a frame later too, since late-loading
    // video/image content further down the page can shift layout enough
    // that the browser re-anchors scroll to a lingering fragment target.
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Framer Motion's whileInView reveals (used almost everywhere on this
    // site) run on an IntersectionObserver, and on a fresh client-side page
    // mount that observer's first callback can sit pending until something
    // nudges the browser to re-check — a mouse move, a real scroll, a
    // resize. Without that nudge, content whose initial state is
    // opacity:0 stays invisible until the visitor happens to move their
    // mouse. Dispatch synthetic scroll/resize events a couple of frames
    // after mount so pending observers resolve on their own.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      raf2 = requestAnimationFrame(() => {
        window.dispatchEvent(new Event('scroll'));
        window.dispatchEvent(new Event('resize'));
      });
    });

    // Heavier pages (multiple videos, the pinned 440vh HowItWorks section)
    // can keep shifting layout well past the first couple of frames as
    // media finishes loading, which was enough to drag the scroll position
    // back down after the resets above — landing mid-page on navigation.
    // Re-assert a few more times over the next half second to cover that,
    // but back off the moment the visitor actually scrolls themselves —
    // this must never fight a real, intentional scroll.
    let userScrolled = false;
    const onUserScroll = (e: Event) => { if (e.isTrusted) userScrolled = true; };
    window.addEventListener('wheel', onUserScroll, { passive: true });
    window.addEventListener('touchmove', onUserScroll, { passive: true });

    const timeouts = [50, 150, 400, 800].map(delay =>
      window.setTimeout(() => {
        if (!userScrolled && window.scrollY !== 0) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, delay)
    );

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      timeouts.forEach(clearTimeout);
      window.removeEventListener('wheel', onUserScroll);
      window.removeEventListener('touchmove', onUserScroll);
    };
  }, [pathname]);
  return null;
}
