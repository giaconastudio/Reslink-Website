import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Careers at Reslink \u00b7 Join the Team",
  description: "Help us build the future of video-first hiring. See open roles at Reslink.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
