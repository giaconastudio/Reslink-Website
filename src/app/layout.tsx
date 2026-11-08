import type { Metadata } from 'next';
import { Inter, Phudu } from 'next/font/google';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';
import VideoAutoplay from '@/components/VideoAutoplay';
import MetaPixelPageView from '@/components/MetaPixelPageView';
import TermlyRouteSync from '@/components/TermlyRouteSync';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const phudu = Phudu({
  subsets: ['latin'],
  variable: '--font-phudu',
  display: 'swap',
  weight: ['600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Reslink. Free Video Resume Builder for Job Seekers',
  description: 'Stand out and land more interviews with a personalized video resume. Reslink helps you build human connections with recruiters. Free forever.',
  openGraph: {
    title: 'Reslink. Your Resume, But Better',
    description: 'Create a free video resume that gets you noticed by recruiters at top companies.',
    type: 'website',
    url: 'https://reslink.io',
  },
};

/* FirstPromoter records the affiliate click (?fpr= and friends) and drops a
   `_fprom_tid` cookie on .reslink.io, which the app's API reads at signup to
   credit the affiliate. Only rendered where the account id is set, so local and
   preview builds never record clicks against the live programme. */
const firstPromoterCid = process.env.NEXT_PUBLIC_FIRSTPROMOTER_CID;

/* Termly is the consent banner. Its resource blocker (autoBlock) holds back
   third-party trackers until the visitor consents, and it sets the Google
   Consent Mode defaults GA4 reads. That only works if it runs before any
   tracker, so it is the first beforeInteractive script below (Next loads those
   in order, waiting for each external one to finish loading before the next)
   and GA4 and the Meta Pixel are never rendered without it: an ID set without
   the Termly UUID would track visitors who were never asked. */
const termlyUuid = process.env.NEXT_PUBLIC_TERMLY_WEBSITE_UUID;
const gaMeasurementId = termlyUuid && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const metaPixelId = termlyUuid && process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${phudu.variable} antialiased`}>
      <body>
        {termlyUuid && (
          <>
            <Script
              id="termly"
              src={`https://app.termly.io/resource-blocker/${encodeURIComponent(termlyUuid)}?autoBlock=on`}
              strategy="beforeInteractive"
            />
            <TermlyRouteSync />
          </>
        )}
        <ScrollToTop />
        <VideoAutoplay />
        {children}
        {metaPixelId && (
          <>
            {/* Meta's base code, minus the initial PageView: MetaPixelPageView
                sends that, and one more on every client-side navigation. */}
            <Script id="meta-pixel" strategy="beforeInteractive">
              {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(metaPixelId)});`}
            </Script>
            <MetaPixelPageView />
          </>
        )}
        {gaMeasurementId && <GoogleAnalytics gaId={gaMeasurementId} />}
        {firstPromoterCid && (
          <>
            <Script id="firstpromoter-queue" strategy="beforeInteractive">
              {`(function(w){w.fpr=w.fpr||function(){w.fpr.q = w.fpr.q||[];w.fpr.q[arguments[0]=='set'?'unshift':'push'](arguments);};})(window);fpr("init", {cid:${JSON.stringify(firstPromoterCid)}});fpr("click");`}
            </Script>
            <Script async src="https://cdn.firstpromoter.com/fpr.js" />
          </>
        )}
      </body>
    </html>
  );
}
