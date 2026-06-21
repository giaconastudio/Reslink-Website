'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';

const solutions = [
  { label: 'Job Seekers', href: '/job-seekers', desc: 'Stand out with a video resume' },
  { label: 'Companies', href: '/companies', desc: 'Find top talent faster' },
  { label: 'Recruitment Agencies', href: '/agencies', desc: 'Scale your placements' },
  { label: 'Universities', href: '/universities', desc: 'Empower your students' },
];

const resources = [
  { label: 'Blog', href: '/blog' },
  { label: 'Help Center', href: '/help' },
  { label: 'Video Resume Guide', href: '/guide' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-18" style={{ height: '72px' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/reslink-logo.png"
              alt="Reslink"
              width={140}
              height={36}
              priority
              style={{ height: 'auto' }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Solutions dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled ? 'text-gray-700 hover:text-navy hover:bg-gray-50' : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                Solutions <ChevronDown size={14} className={`transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
              </button>
              {solutionsOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {solutions.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="flex flex-col px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-navy">{s.label}</span>
                      <span className="text-xs text-gray-500 mt-0.5">{s.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled ? 'text-gray-700 hover:text-navy hover:bg-gray-50' : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                Resources <ChevronDown size={14} className={`transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {resources.map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      className="block px-4 py-3 text-sm font-medium text-navy hover:bg-gray-50 transition-colors"
                    >
                      {r.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/company"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                scrolled ? 'text-gray-700 hover:text-navy hover:bg-gray-50' : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Company
            </Link>
            <Link
              href="/pricing"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                scrolled ? 'text-gray-700 hover:text-navy hover:bg-gray-50' : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Pricing
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                scrolled ? 'text-navy hover:bg-gray-50' : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Login
            </Link>
            <Link href="/signup" className="btn-primary text-sm py-2.5 px-5">
              Get Started Free
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-navy' : 'text-white'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="container py-4 flex flex-col gap-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">Solutions</p>
            {solutions.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-navy hover:bg-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                {s.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 my-2" />
            <Link href="/pricing" className="px-3 py-2.5 rounded-lg text-sm font-medium text-navy hover:bg-gray-50" onClick={() => setMobileOpen(false)}>Pricing</Link>
            <Link href="/company" className="px-3 py-2.5 rounded-lg text-sm font-medium text-navy hover:bg-gray-50" onClick={() => setMobileOpen(false)}>Company</Link>
            <div className="border-t border-gray-100 my-2" />
            <Link href="/login" className="px-3 py-2.5 rounded-lg text-sm font-medium text-navy hover:bg-gray-50" onClick={() => setMobileOpen(false)}>Login</Link>
            <Link href="/signup" className="btn-primary justify-center mt-2" onClick={() => setMobileOpen(false)}>Get Started Free</Link>
          </div>
        </div>
      )}
    </header>
  );
}
