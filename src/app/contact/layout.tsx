import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Reslink",
  description: "Get in touch with the Reslink team. Questions, support, partnerships \u2014 we're here.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
