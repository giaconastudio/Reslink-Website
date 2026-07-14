import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Reslink for Recruitment Agencies \u00b7 Win More Placements",
  description: "Send clients video-first candidate shortlists they actually watch. Reslink helps recruitment agencies close placements faster with watch-time analytics.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
