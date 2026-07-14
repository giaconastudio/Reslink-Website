import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Reslink Pricing \u00b7 Free for Job Seekers, Plans for Teams",
  description: "Start free. Job seekers get a powerful free plan; companies and agencies get AI screening and hiring tools with transparent per-applicant pricing.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
