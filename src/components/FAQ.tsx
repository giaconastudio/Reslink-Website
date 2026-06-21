'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: 'Is Reslink free?', a: 'Yes. Creating a job seeker account and building your video resume is completely free. We offer premium plans with advanced analytics and features for power users.' },
  { q: 'How long should my video pitch be?', a: 'We recommend 60–90 seconds. A tight, confident pitch that respects the recruiter\'s time performs significantly better than a long one.' },
  { q: 'Can I use Reslink for any type of job?', a: 'Absolutely. Reslink works across all industries — tech, finance, marketing, creative, operations, and more.' },
  { q: 'Will my video pitch affect ATS compatibility?', a: 'No. Your traditional resume is still uploaded alongside your video. Reslink supplements — not replaces — your PDF, so it works with all ATS systems.' },
  { q: 'Do I need special equipment to record my video?', a: 'No. Your laptop or phone camera is all you need. Good lighting and a quiet room go a long way, but the bar is much lower than you think.' },
  { q: 'Can companies search for candidates on Reslink?', a: 'Yes. Companies and recruiters can discover and search candidate profiles directly on the platform, giving you exposure beyond just the links you share.' },
  { q: 'Do I have access to resources on creating a great video resume?', a: "Yes — we have a full library of guides, templates, and tips. Head to our Resources section to get started." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#FF5A1F' }}>FAQ</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight" style={{ color: '#0B1437' }}>
              Common questions
            </h2>
          </motion.div>

          <div className="divide-y" style={{ borderColor: '#EEEEF0' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="py-5">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between text-left gap-4"
                >
                  <span className="font-semibold text-base" style={{ color: '#0B1437' }}>{faq.q}</span>
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: open === i ? '#FF5A1F' : '#EEEEF0' }}
                  >
                    {open === i
                      ? <Minus size={12} className="text-white" />
                      : <Plus size={12} style={{ color: '#5C6070' }} />
                    }
                  </span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="pt-3 text-sm leading-relaxed" style={{ color: '#5C6070' }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
