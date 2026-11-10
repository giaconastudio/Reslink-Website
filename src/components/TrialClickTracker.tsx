'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params: Record<string, string>) => void;
  }
}

/* One delegated listener reports which lander's join button was clicked, so ad campaigns can be
   compared by funnel entry. Buttons are plain links to /go/<campaign>; the campaign is read from
   the href so new buttons need no wiring. */
export default function TrialClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest('a[href^="/go/"]');
      const campaign = link?.getAttribute('href')?.slice('/go/'.length).split(/[?#]/)[0];
      if (campaign) window.gtag?.('event', 'join_click', { campaign });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
