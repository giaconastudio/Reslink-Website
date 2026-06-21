'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 gradient-navy relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FF5A1F 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #4F6EF7 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#FF5A1F' }}>
            Ready to stand out?
          </span>
          <h2 className="text-4xl lg:text-6xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
            Your next job starts with{' '}
            <span className="gradient-text">your Reslink.</span>
          </h2>
          <p className="text-white/60 text-xl leading-relaxed mb-10">
            Join thousands of job seekers who are getting more callbacks, more interviews, and more offers — for free.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/signup" className="btn-primary text-base px-8 py-4 w-full sm:w-auto justify-center">
              Create Your Free Account
              <ArrowRight size={18} />
            </a>
            <a href="/how-it-works" className="btn-secondary text-base px-8 py-4 w-full sm:w-auto justify-center">
              See how it works
            </a>
          </div>
          <p className="text-white/30 text-sm mt-6">No credit card required · Free forever</p>
        </motion.div>
      </div>
    </section>
  );
}
