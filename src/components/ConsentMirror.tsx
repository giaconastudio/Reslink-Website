'use client';

import { useEffect } from 'react';
import { syncTermlyConsent } from '@/lib/adConsent';

type TermlyEvent = 'initialized' | 'consent';

declare global {
  interface Window {
    /* Filled by the inline script next to Termly's tag. Termly loads before React, so its
       `initialized` event has usually fired by the time this component mounts; the queue holds
       what it reported until then. */
    __rlTermlyEvents?: { push: (event: TermlyEvent) => unknown };
  }
}

const handle = (event: TermlyEvent) => syncTermlyConsent(event === 'consent');

/* Mirrors the visitor's Termly advertising choice into the cookie the app reads. Events that
   arrived before mount are replayed, then the queue's push is swapped for the handler so later
   events apply immediately. */
export default function ConsentMirror() {
  useEffect(() => {
    const queued = Array.isArray(window.__rlTermlyEvents) ? window.__rlTermlyEvents : [];
    window.__rlTermlyEvents = { push: (event) => handle(event) };
    queued.forEach(handle);
  }, []);

  return null;
}
