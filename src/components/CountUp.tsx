'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView, animate } from 'framer-motion';

/**
 * Animated number that counts up from 0 when scrolled into view.
 * Usage: <CountUp value={34} suffix="%" /> · <CountUp value={3} suffix="×" /> · <CountUp value={10000} suffix="+" />
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
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setDisplay(
        decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString()
      ),
    });
    return () => controls.stop();
  }, [inView, value, duration, decimals]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

/** Parses stat strings like "40%", "3×", "500+", "48h" and animates the numeric part. */
export function AnimatedStat({ value }: { value: string }) {
  const m = value.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
  if (!m) return <>{value}</>;
  const num = parseFloat(m[2].replace(/,/g, ''));
  const decimals = m[2].includes('.') ? m[2].split('.')[1].length : 0;
  return <CountUp value={num} prefix={m[1]} suffix={m[3]} decimals={decimals} />;
}
