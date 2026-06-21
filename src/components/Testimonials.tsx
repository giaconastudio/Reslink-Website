'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "After adding my Reslink to every application, I started getting callbacks within 48 hours. It's a complete game changer.",
    name: 'Ben Harper',
    role: 'Software Engineer at Amazon',
    initials: 'BH',
    color: '#4F6EF7',
  },
  {
    quote: "I landed my dream job and I genuinely believe the video resume made all the difference. Reslink let me show who I really am.",
    name: 'Sofia Rodriguez',
    role: 'Marketing Manager at Meta',
    initials: 'SR',
    color: '#A855F7',
  },
  {
    quote: "The analytics feature is unreal. I saw a senior partner at EY watch my video three times — I reached out that afternoon and got an interview the next morning.",
    name: 'Marcus Williams',
    role: 'Finance Analyst at EY',
    initials: 'MW',
    color: '#F59E0B',
  },
  {
    quote: "My recruiter said she had never seen a video resume done that well. She shared it with the entire hiring team before I even had an interview.",
    name: 'Elena Kowalski',
    role: 'Product Manager at Revolut',
    initials: 'EK',
    color: '#10B981',
  },
  {
    quote: "As a designer I care about how I present myself. Reslink resonated with the creative teams I was targeting. Two offers in two weeks.",
    name: 'Priya Patel',
    role: 'UX Designer at Google',
    initials: 'PP',
    color: '#EF4444',
  },
  {
    quote: "I was hesitant about putting a video online, but the platform made it so easy. Within a week I had three recruiter calls lined up.",
    name: 'James Chen',
    role: 'Supply Chain Analyst at Tesla',
    initials: 'JC',
    color: '#0B1437',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24" style={{ background: '#F7F8FA' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#FF5A1F' }}>
            Success stories
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight" style={{ color: '#0B1437' }}>
            Real results from real candidates
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 flex flex-col"
              style={{ boxShadow: '0 1px 4px rgba(11,20,55,0.06)' }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={13} fill="#FF5A1F" style={{ color: '#FF5A1F' }} />
                ))}
              </div>
              <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: '#5C6070' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: '#0B1437' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: '#9A9FA8' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
