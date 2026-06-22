'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: 'Is Reslink free?', a: 'Yes. Creating a job seeker account and building your video resume is completely free. We offer premium plans with advanced analytics and features for power users.' },
  { q: 'How long should my video pitch be?', a: "We recommend 60–90 seconds. A tight, confident pitch that respects the recruiter's time performs significantly better than a long one." },
  { q: 'Can I use Reslink for any type of job?', a: 'Absolutely. Reslink works across all industries — tech, finance, marketing, creative, operations, and more.' },
  { q: 'Will my video pitch affect ATS compatibility?', a: 'No. Your traditional resume is still uploaded alongside your video. Reslink supplements your PDF — it works with all ATS systems.' },
  { q: 'Do I need special equipment to record my video?', a: 'No. Your laptop or phone camera is all you need. Good lighting and a quiet room make a big difference.' },
  { q: 'Can companies search for candidates on Reslink?', a: 'Yes. Companies and recruiters can discover and search candidate profiles directly on the platform.' },
  { q: 'Do I have access to resources on creating a great video resume?', a: "Yes — we have a full library of guides, templates, and tips. Head to our Resources section to get started." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ padding: 'clamp(64px, 8vw, 96px) 0', background: '#fff' }}>
      <div className="container">
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '56px' }}
          >
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px' }}>
              Frequently asked questions
            </p>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#041635', lineHeight: 1.12 }}>
              Everything you need to know
            </h2>
          </motion.div>

          <div>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                style={{ borderBottom: '1px solid #EEEEF0' }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', gap: '16px',
                    padding: '20px 0', background: 'none', border: 'none',
                    cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 600, color: '#041635' }}>{faq.q}</span>
                  <span style={{
                    width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                    background: open === i ? '#0C63E3' : '#F7F8FA',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.15s ease',
                  }}>
                    {open === i
                      ? <Minus size={12} color="#fff" />
                      : <Plus size={12} color="#5C6070" />
                    }
                  </span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, paddingBottom: '20px' }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
