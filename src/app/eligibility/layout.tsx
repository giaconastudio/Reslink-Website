import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Check your student & veteran discount · Reslink',
  description: 'Enter your email to instantly check if you qualify for 50% off Reslink Premium. Free for students and veterans — verified, no code needed.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
