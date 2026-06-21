'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24" style={{ background: '#F7F8FA' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-5" style={{ color: '#0B1437' }}>
            Ready to stand out?
          </h2>
          <p className="text-xl mb-10" style={{ color: '#5C6070' }}>
            Join thousands of job seekers getting more callbacks, more interviews, and more offers — for free.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a href="/signup" className="btn-primary text-base" style={{ padding: '14px 28px' }}>
              Get started free
              <ArrowRight size={16} />
            </a>
            <a href="/how-it-works" className="btn-outline text-base" style={{ padding: '14px 28px' }}>
              See how it works
            </a>
          </div>
          <p className="text-sm mt-6" style={{ color: '#C8CBD2' }}>
            No credit card required · Free forever
          </p>
        </motion.div>
      </div>
    </section>
  );
}
