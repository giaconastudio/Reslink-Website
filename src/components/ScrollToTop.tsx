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
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname]);
  return null;
}
