import type { Metadata } from 'next';
import { Inter, Phudu } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';
import VideoAutoplay from '@/components/VideoAutoplay';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${phudu.variable} antialiased`}>
      <body>
        <ScrollToTop />
        <VideoAutoplay />
        {children}
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
