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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-white border-b border-gray-100' : 'bg-white'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between" style={{ height: '68px' }}>
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/reslink-logo.png"
              alt="Reslink"
              width={130}
              height={34}
              priority
              style={{ height: '30px', width: 'auto' }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-navy hover:bg-gray-50 transition-colors" style={{ color: '#5C6070' }}>
                Solutions <ChevronDown size={13} className={`transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
              </button>
              {solutionsOpen && (
                <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  {solutions.map((s) => (
                    <Link key={s.href} href={s.href} className="flex flex-col px-4 py-3 hover:bg-gray-50 transition-colors">
                      <span className="text-sm font-semibold" style={{ color: '#0B1437' }}>{s.label}</span>
                      <span className="text-xs mt-0.5" style={{ color: '#9A9FA8' }}>{s.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {['Resources', 'Company', 'Pricing'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50"
                style={{ color: '#5C6070' }}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors" style={{ color: '#0B1437' }}>
              Log in
            </Link>
            <Link href="/signup" className="btn-primary text-sm" style={{ padding: '10px 20px' }}>
              Get started free
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container py-4 flex flex-col gap-1">
            {solutions.map((s) => (
              <Link key={s.href} href={s.href} className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50" style={{ color: '#0B1437' }} onClick={() => setMobileOpen(false)}>
                {s.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 my-2" />
            <Link href="/pricing" className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50" style={{ color: '#0B1437' }} onClick={() => setMobileOpen(false)}>Pricing</Link>
            <Link href="/company" className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50" style={{ color: '#0B1437' }} onClick={() => setMobileOpen(false)}>Company</Link>
            <div className="border-t border-gray-100 my-2" />
            <Link href="/login" className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50" style={{ color: '#0B1437' }} onClick={() => setMobileOpen(false)}>Log in</Link>
            <Link href="/signup" className="btn-primary justify-center mt-1" onClick={() => setMobileOpen(false)}>Get started free</Link>
          </div>
        </div>
      )}
    </header>
  );
}
