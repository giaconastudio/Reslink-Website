import Link from 'next/link';
import Image from 'next/image';

const COLS = [
  {
    heading: 'For Individuals',
    items: [
      { label: 'Job Seekers', href: '/job-seekers' },
      { label: 'Students', href: '/students' },
      { label: 'Veterans', href: '/veterans' },
    ],
  },
  {
    heading: 'For Business',
    items: [
      { label: 'Companies', href: '/companies' },
      { label: 'Agencies', href: '/agencies' },
      { label: 'Universities', href: '/universities' },
    ],
  },
  {
    heading: 'Resources',
    items: [
      { label: 'Blog', href: '/blog' },
      { label: 'Free Templates', href: '/templates' },
      { label: 'Help Center', href: '/help' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: '#060D24', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '4px solid #041635' }}>
      <style>{`
        .footer-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr 1fr; gap: 32px; margin-bottom: 48px; }
        .footer-link-cols { display: contents; }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.07); padding-top: 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .footer-link { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 13px; transition: color 0.15s; }
        .footer-link:hover { color: rgba(255,255,255,0.95); }
        .footer-bottom-link { color: rgba(255,255,255,0.3); text-decoration: none; font-size: 13px; transition: color 0.15s; }
        .footer-bottom-link:hover { color: rgba(255,255,255,0.8); }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; row-gap: 36px; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr 1fr; row-gap: 28px; }
          .footer-brand { grid-column: 1 / -1; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 8px; }
        }
      `}</style>
      <div className="container" style={{ padding: '56px 24px 40px' }}>
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '16px' }}>
              <Image
                src="/reslink-logo.svg"
                alt="Reslink"
                width={140}
                height={36}
                style={{ height: '28px', width: 'auto', filter: 'brightness(0) invert(1)' }}
              />
            </Link>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, maxWidth: '220px' }}>
              The platform that helps job seekers stand out with personalized video resumes.
            </p>
          </div>

          {/* Link columns */}
          {COLS.map(col => (
            <div key={col.heading}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '16px' }}>
                {col.heading}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.items.map(item => (
                  <li key={item.href}>
                    <Link href={item.href} className="footer-link">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} Reslink. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[['Privacy', '/privacy'], ['Terms', '/terms']].map(([label, href]) => (
              <Link key={href} href={href} className="footer-bottom-link">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
