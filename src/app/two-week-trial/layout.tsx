import type { Metadata } from 'next';

/* The two-week-trial A/B lander. It starts as a copy of the job-seeker
   homepage, so it would compete with that page in search results — noindex
   keeps it out of Google while the test runs. Traffic reaches it through the
   links we send, not through search. */
export const metadata: Metadata = {
  title: 'Try Reslink Free for Two Weeks · Reslink',
  description: 'Stand out with a 60-second video pitch, AI-written script, and live recruiter analytics. Create your free Reslink in under 5 minutes.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
