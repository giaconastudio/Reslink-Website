import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Reslink Blog \u00b7 Career Advice & Video Resume Tips",
  description: "Guides, tips, and career advice on video resumes, standing out to recruiters, and landing more interviews.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
