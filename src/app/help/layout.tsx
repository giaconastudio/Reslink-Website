import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Reslink Help Center",
  description: "Answers to common questions about video resumes, AI screening, analytics, billing, and more \u2014 for job seekers, companies, recruiters, and universities.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
