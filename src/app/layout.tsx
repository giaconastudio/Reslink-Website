import type { Metadata } from 'next';
import { Inter, Phudu } from 'next/font/google';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${phudu.variable} antialiased`}>
      <body><ScrollToTop />{children}</body>
    </html>
  );
}
