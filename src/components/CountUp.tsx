'use client';

import { useEffect, useState } from 'react';
import { animate } from 'framer-motion';

/**
 * Animated number that counts up from 0 on mount.
 * Usage: <CountUp value={34} suffix="%" /> · <CountUp value={3} suffix="×" /> · <CountUp value={10000} suffix="+" />
 *
 * Previously gated on framer-motion's `useInView` (IntersectionObserver),
 * so it only started once scrolled into view — but that observer callback
 * can sit queued on the main thread indefinitely until a genuine user
 * interaction forces the browser to prioritize it, which showed up in
 * production as every stat stuck at 0 forever (same root cause already
 * fixed sitewide for whileInView reveals; this hook-based usage slipped
 * through that pass). Runs on mount instead — reliability over the
 * scroll-triggered polish.
 */
export default function CountUp({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setDisplay(
        decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString()
      ),
    });
    return () => controls.stop();
  }, [value, duration, decimals]);

  return <span>{prefix}{display}{suffix}</span>;
}

/** Parses stat strings like "40%", "3×", "500+", "48h" and animates the numeric part. */
export function AnimatedStat({ value }: { value: string }) {
  const m = value.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
  if (!m) return <>{value}</>;
  const num = parseFloat(m[2].replace(/,/g, ''));
  const decimals = m[2].includes('.') ? m[2].split('.')[1].length : 0;
  return <CountUp value={num} prefix={m[1]} suffix={m[3]} decimals={decimals} />;
}
