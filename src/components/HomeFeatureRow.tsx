'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Media =
  | { kind: 'video'; src: string; poster?: string }
  | { kind: 'image'; src: string; alt: string };

export default function HomeFeatureRow({
  reverse, dark, tag, title, desc, href, media, delay = 0,
}: {
  reverse?: boolean;
  dark?: boolean;
  tag: string;
  title: string;
  desc: string;
  href: string;
  media: Media;
  delay?: number;
}) {
  const accent = dark ? '#D8F950' : '#0C63E3';
  return (
    <div className={`hfr-row${reverse ? ' reverse' : ''}`}>
      <motion.div
        className="hfr-media"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '999px' }}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`hfr-frame${dark ? ' hfr-frame-dark' : ''}`}>
          <div className={`hfr-bar${dark ? ' hfr-bar-dark' : ''}`}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#FEBC2E', display: 'inline-block' }} />
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#28C840', display: 'inline-block' }} />
          </div>
          <div className="hfr-visual">
            {media.kind === 'video' ? (
              <video
                src={media.src}
                poster={media.poster}
                autoPlay muted loop playsInline preload="metadata"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={media.src} alt={media.alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="hfr-copy"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '999px' }}
        transition={{ duration: 0.5, delay: delay + 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="hfr-tag" style={{ color: accent }}>{tag}</p>
        <h3 className="hfr-title" style={{ color: dark ? '#fff' : '#041635' }}>{title}</h3>
        <p className="hfr-desc" style={{ color: dark ? 'rgba(255,255,255,0.6)' : '#5C6070' }}>{desc}</p>
        <Link href={href} className="hfr-link" style={{ color: accent }}>
          Learn more <ArrowRight size={14} />
        </Link>
      </motion.div>
    </div>
  );
}
