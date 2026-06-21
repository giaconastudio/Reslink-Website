import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  Solutions: [
    { label: 'Job Seekers', href: '/job-seekers' },
    { label: 'Companies', href: '/companies' },
    { label: 'Recruitment Agencies', href: '/agencies' },
    { label: 'Universities', href: '/universities' },
  ],
  Resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Help Center', href: '/help' },
    { label: 'Video Resume Guide', href: '/guide' },
    { label: 'Templates', href: '/templates' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Contact', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: '#0B1437' }}>
      <div className="container py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand col */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/reslink-logo-white.png"
                alt="Reslink"
                width={130}
                height={34}
                style={{ height: 'auto' }}
              />
            </Link>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs mb-6">
              The platform that helps job seekers stand out with personalized video resumes and helps companies discover top talent.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {['LinkedIn', 'Twitter', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                  aria-label={social}
                >
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([col, links]) => (
            <div key={col}>
              <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-5">{col}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/55 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Reslink. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/30 text-sm hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/30 text-sm hover:text-white/60 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
