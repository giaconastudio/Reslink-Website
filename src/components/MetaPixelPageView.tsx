'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/* The Pixel snippet in the root layout only runs once per full page load, but
   moving between pages here is a client-side navigation, so without this the
   Pixel would only ever see the landing page. Fires PageView for the first page
   too, which is why the layout snippet calls `init` but not `track`. */
export default function MetaPixelPageView() {
  const pathname = usePathname();

  useEffect(() => {
    window.fbq?.('track', 'PageView');
  }, [pathname]);

  return null;
}
