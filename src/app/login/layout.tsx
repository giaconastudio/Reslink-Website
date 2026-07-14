import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Log in \u00b7 Reslink",
  description: "Log in to your Reslink account.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
