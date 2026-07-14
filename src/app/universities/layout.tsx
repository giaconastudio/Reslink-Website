import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Reslink for Universities & Career Centers",
  description: "Equip every student with a video pitch and give your career center real placement data. Universities using Reslink see a 34% placement rate lift.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
