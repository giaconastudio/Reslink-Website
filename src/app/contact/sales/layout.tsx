import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Talk to Sales \u00b7 Reslink",
  description: "Book a demo with the Reslink team. See how video-first hiring works for your company, agency, or university.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
