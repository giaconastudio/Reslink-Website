import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Check your student & veteran discount · Reslink',
  description: 'Check whether you qualify for 50% off Reslink Premium. Students and veterans save 50%; automatic email verification is coming soon.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
