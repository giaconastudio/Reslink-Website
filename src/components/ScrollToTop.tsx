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
    const raf = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }));
    return () => cancelAnimationFrame(raf);
  }, [pathname]);
  return null;
}
