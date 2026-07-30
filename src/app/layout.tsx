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
  title: 'Reslink. Video-First Hiring for Candidates and Companies',
  description: 'Reslink replaces the flat PDF resume with a short video pitch, real engagement analytics, and one shareable link — for job seekers, companies, agencies, and universities.',
  openGraph: {
    title: 'Reslink. Hiring works better when people can see each other.',
    description: 'A resume you can actually watch. Free for individuals, built for hiring teams and career centers.',
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
