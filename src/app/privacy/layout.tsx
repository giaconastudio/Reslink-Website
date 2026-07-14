import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy \u00b7 Reslink",
  description: "How Reslink collects, uses, and protects your data.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
