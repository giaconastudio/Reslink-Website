'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'Is Reslink free?',
    a: 'Yes! Creating a job seeker account and building your video resume is completely free. We offer premium plans with advanced analytics and features for power users.',
  },
  {
    q: 'How long should my video pitch be?',
    a: 'We recommend 60–90 seconds. Recruiters are busy — a tight, confident pitch that respects their time performs significantly better than a long one.',
  },
  {
    q: 'Can I use Reslink for any type of job?',
    a: 'Absolutely. Reslink works across industries — tech, finance, marketing, creative, operations, and more. Any job seeker who wants to stand out can benefit.',
  },
  {
    q: 'Do I need any special equipment to record my video?',
    a: 'No. Your laptop or phone camera is all you need. We recommend good lighting and a quiet environment, but the bar is much lower than you think.',
  },
  {
    q: 'Will my video pitch affect ATS (Applicant Tracking System) compatibility?',
    a: 'No. Your traditional resume is still uploaded alongside your video. Reslink is a supplement — not a replacement — for your PDF, so it works with all ATS systems.',
  },
  {
    q: 'Can companies search for candidates on Reslink?',
    a: 'Yes. Companies and recruiters can discover and search for candidates directly on the platform, giving your profile even more exposure beyond the links you share.',
  },
  {
    q: 'Do I have access to resources on how to create a great video resume?',
    a: 'Yes — we have a full library of guides, templates, and tips to help you craft a pitch that converts. Head to our Resources section to get started.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#FF5A1F' }}>
              FAQ
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight" style={{ color: '#0B1437' }}>
              Frequently asked questions
            </h2>
          </motion.div>

          {/* Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${
                  open === i ? 'border-orange-200 shadow-sm' : 'border-gray-100'
                }`}
                style={open === i ? { borderColor: 'rgba(255,90,31,0.25)' } : {}}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-base pr-4" style={{ color: '#0B1437' }}>{faq.q}</span>
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{ background: open === i ? '#FF5A1F' : '#F1F3F9' }}
                  >
                    {open === i
                      ? <Minus size={14} className="text-white" />
                      : <Plus size={14} style={{ color: '#5A6480' }} />
                    }
                  </span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-5 pb-5">
                        <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                      </div>
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
