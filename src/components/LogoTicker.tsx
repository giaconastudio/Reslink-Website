'use client';

const COMPANY_LOGOS = [
  { src: '/logos/company/amazon.svg',    alt: 'Amazon' },
  { src: '/logos/company/meta.svg',      alt: 'Meta' },
  { src: '/logos/company/tesla.svg',     alt: 'Tesla' },
  { src: '/logos/company/hubspot.svg',   alt: 'HubSpot' },
  { src: '/logos/company/accenture.svg', alt: 'Accenture' },
  { src: '/logos/company/revolut.svg',   alt: 'Revolut' },
  { src: '/logos/company/adobe.svg',     alt: 'Adobe' },
  { src: '/logos/company/ey.svg',        alt: 'EY' },
  { src: '/logos/company/cocacola.svg',  alt: 'Coca-Cola' },
];

const UNIVERSITY_LOGOS = [
  { src: '/logos/university/cambridge.webp',                   alt: 'Cambridge' },
  { src: '/logos/university/cornell-university.webp',          alt: 'Cornell University' },
  { src: '/logos/university/princeton.webp',                   alt: 'Princeton' },
  { src: '/logos/university/university-of-michigan.webp',      alt: 'University of Michigan' },
  { src: '/logos/university/george-washington-university.webp',alt: 'George Washington University' },
  { src: '/logos/university/syracuse-orange.webp',             alt: 'Syracuse' },
  { src: '/logos/university/uel.webp',                         alt: 'UEL' },
  { src: '/logos/university/athletic-block.webp',              alt: 'Athletic Block' },
  { src: '/logos/university/col-athletics.webp',               alt: 'Columbia Athletics' },
];

interface Props {
  variant?: 'company' | 'university';
}

export default function LogoTicker({ variant = 'company' }: Props) {
  const logos = variant === 'university' ? UNIVERSITY_LOGOS : COMPANY_LOGOS;
  const doubled = [...logos, ...logos];

  const label = variant === 'university'
    ? 'Students from top universities trust Reslink to land interviews'
    : '300+ candidates have landed interviews at top companies through Reslink';

  return (
    <section style={{ background: '#fff', paddingTop: '52px', paddingBottom: '60px', overflow: 'hidden', borderTop: '1px solid #ECEEF1', borderBottom: '1px solid #ECEEF1' }}>
      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .ticker-track { display: flex; animation: ticker 36s linear infinite; }
        .ticker-track:hover { animation-play-state: paused; }
        .ticker-logo { filter: grayscale(100%); opacity: 0.45; transition: filter 0.25s, opacity 0.25s; }
        .ticker-logo:hover { filter: grayscale(0%); opacity: 1; }
      `}</style>

      <p style={{ textAlign: 'center', fontSize: '13px', fontWeight: 500, color: '#9A9FA8', marginBottom: '32px', fontFamily: 'var(--font-body)', letterSpacing: '0.02em', padding: '0 16px' }}>
        {label}
      </p>

      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to right, #fff, transparent)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to left, #fff, transparent)', zIndex: 1, pointerEvents: 'none' }} />

        <div className="ticker-track" style={{ gap: '64px', paddingLeft: '40px', alignItems: 'center' }}>
          {doubled.map((logo, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className="ticker-logo"
              style={{ height: '32px', width: 'auto', flexShrink: 0, objectFit: 'contain', maxWidth: '120px' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
