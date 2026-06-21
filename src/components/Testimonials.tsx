'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ben Harper',
    role: 'Software Engineer',
    company: 'Amazon',
    avatar: 'BH',
    color: 'from-blue-500 to-blue-600',
    quote: "I applied to the same type of roles for months with no luck. After adding my Reslink to every application, I started getting callbacks within 48 hours. It's a complete game changer.",
    stars: 5,
  },
  {
    name: 'Sofia Rodriguez',
    role: 'Marketing Manager',
    company: 'Meta',
    avatar: 'SR',
    color: 'from-purple-500 to-pink-500',
    quote: 'Reslink gave me the confidence to show who I really am — not just a list of bullet points. I landed my dream job and I genuinely believe the video resume made all the difference.',
    stars: 5,
  },
  {
    name: 'James Chen',
    role: 'Supply Chain Analyst',
    company: 'Tesla',
    avatar: 'JC',
    color: 'from-red-500 to-red-600',
    quote: 'I was hesitant about putting a video online, but the platform made it so easy. Within a week I had three recruiter calls lined up. Highly recommend for anyone serious about their job search.',
    stars: 5,
  },
  {
    name: 'Priya Patel',
    role: 'UX Designer',
    company: 'Google',
    avatar: 'PP',
    color: 'from-green-500 to-teal-500',
    quote: 'As a designer I care about how I present myself. Reslink let me show my personality in a way that resonated with the creative teams I was targeting. Two offers in two weeks.',
    stars: 5,
  },
  {
    name: 'Marcus Williams',
    role: 'Finance Analyst',
    company: 'EY',
    avatar: 'MW',
    color: 'from-yellow-500 to-orange-400',
    quote: 'The analytics feature is unreal. I could see that a senior partner at EY watched my video three times in one day. I reached out that same afternoon and got an interview the next morning.',
    stars: 5,
  },
  {
    name: 'Elena Kowalski',
    role: 'Product Manager',
    company: 'Revolut',
    avatar: 'EK',
    color: 'from-indigo-500 to-blue-500',
    quote: 'My recruiter told me she had never seen a video resume done that well. She said she shared it with the whole hiring team before I even had an official interview. Got the job.',
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section" style={{ background: '#F8F9FC' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#FF5A1F' }}>
            Success Stories
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4" style={{ color: '#0B1437' }}>
            How job seekers{' '}
            <span className="gradient-text">landed their dream roles</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Over 200 candidates have landed interviews globally through Reslink.
          </p>
        </motion.div>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <Quote size={24} style={{ color: '#FF5A1F', opacity: 0.5 }} className="mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} size={14} fill="#FF5A1F" style={{ color: '#FF5A1F' }} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: '#0B1437' }}>{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
