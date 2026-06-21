import Link from 'next/link';

const links = {
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
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: '#060D24', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container" style={{ padding: '56px 24px 40px' }}>
        {/* Top row */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px' }}>
          {/* Brand */}
          <div>
            {/* Text logo fallback until image is uploaded */}
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '28px', height: '28px', background: '#FF5A1F', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </div>
              <span style={{ fontSize: '17px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>RESLINK</span>
            </Link>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, maxWidth: '240px' }}>
              The platform that helps job seekers stand out with personalized video resumes.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([col, items]) => (
            <div key={col}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '16px' }}>
                {col}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {items.map(item => (
                  <li key={item.href}>
                    <Link href={item.href} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.15s' }}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} Reslink. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[['Privacy', '/privacy'], ['Terms', '/terms']].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
