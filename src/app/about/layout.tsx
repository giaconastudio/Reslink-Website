import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Reslink \u00b7 The Team Behind Video-First Hiring",
  description: "Meet the team building Reslink. We believe you're more than a PDF \u2014 our video resume platform helps candidates get seen and companies hire better.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
