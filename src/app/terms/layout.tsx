import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service \u00b7 Reslink",
  description: "The terms that govern your use of Reslink.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
