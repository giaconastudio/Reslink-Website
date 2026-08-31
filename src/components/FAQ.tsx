'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: 'Is Reslink free?', a: 'Yes. Creating a job seeker account and building your video resume is completely free. We offer premium plans with advanced analytics and features for power users.' },
  { q: "What if I'm not comfortable on camera?", a: "That's what the teleprompter is for. Your script scrolls on screen as you record, so you can just read and stay looking at the camera. Most people are happy with their take after a try or two." },
  { q: 'Will my video affect ATS compatibility?', a: 'No. Your traditional resume is still uploaded alongside your video. Reslink supplements your PDF. It works with all ATS systems.' },
  { q: 'How long should my video be?', a: "We recommend 60-90 seconds. A tight, confident pitch that respects the recruiter's time performs significantly better than a long one." },
  { q: 'Do I need special equipment?', a: 'No. Your laptop or phone camera is all you need. Good lighting and a quiet room make a big difference.' },
  { q: 'Can I use Reslink for any type of job?', a: 'Absolutely. Reslink works across all industries: tech, finance, marketing, creative, operations, and more.' },
  { q: 'Can companies search for candidates on Reslink?', a: "No. Reslink isn't a searchable database. Recruiters only see your Reslink when you share it with them, whether that's in an application, your email, or on LinkedIn. You decide who gets the link." },
  { q: 'Where can I learn to make a great Reslink?', a: 'We have a full library of guides, templates, and examples. Head to our Resources section to get started.' },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ padding: 'clamp(64px, 8vw, 96px) 24px clamp(36px, 4.5vw, 56px)', background: '#F6F7F9' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '52px' }}
        >
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>
            Frequently asked questions
          </p>
          <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.96, letterSpacing: '-0.03em' }}>
            Before you record
          </h2>
        </motion.div>

        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px', boxShadow: '0 1px 8px rgba(6,26,58,0.04)' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid #ECEEF1' : 'none' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#061A3A', fontFamily: 'var(--font-body)' }}>{faq.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0, scale: open === i ? 1.08 : 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  style={{ width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0, background: open === i ? '#1468E8' : '#EAF1FF', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s ease' }}>
                  {open === i ? <Minus size={12} color="#fff" /> : <Plus size={12} color="#1468E8" />}
                </motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}>
                    <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, paddingBottom: '20px', fontFamily: 'var(--font-body)' }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
