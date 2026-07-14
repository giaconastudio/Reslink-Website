import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Reslink for Companies \u00b7 AI Candidate Screening & Video Hiring",
  description: "Make better hiring decisions, faster. Reslink gives hiring teams AI-scored video profiles, team collaboration tools, pipelines, and a branded job board.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
