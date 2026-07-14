import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Olivia Stone · Example Reslink Profile",
  description: "See a real example of a Reslink video resume profile — video pitch, AI score, watch-time analytics, and one shareable link. Create yours free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
