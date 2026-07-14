import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Video Resume Builder for Job Seekers \u00b7 Reslink",
  description: "Stand out with a 60-second video pitch, AI-written script, and live recruiter analytics. Create your free Reslink in under 5 minutes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
