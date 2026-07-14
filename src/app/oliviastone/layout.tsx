import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Olivia Stone · Example Reslink Profile",
  description: "See a real example of a Reslink profile — resume, 60-second video pitch, and live watch-time analytics in one shareable link. Create yours free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
