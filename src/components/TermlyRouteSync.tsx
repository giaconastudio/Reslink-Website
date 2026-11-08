'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    Termly?: { initialize: () => void };
  }
}

/* Termly scans the page once when its script loads, e.g. to wire up the
   footer's "Cookie Preferences" link. Pages here swap client-side, so that
   link is a fresh element after every navigation; re-initialising (as Termly's
   Next.js guide does) re-binds it. The first render is skipped because the
   script, loaded beforeInteractive, has only just initialised itself. */
export default function TermlyRouteSync() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.Termly?.initialize();
  }, [pathname]);

  return null;
}
