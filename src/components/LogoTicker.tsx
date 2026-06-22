'use client';

const companies = [
  'Amazon', 'Google', 'Meta', 'Microsoft', 'Stripe',
  'Salesforce', 'Apple', 'Netflix', 'Shopify', 'LinkedIn',
  'Revolut', 'HubSpot', 'Accenture', 'Adidas', 'EY',
  'Spotify', 'Airbnb', 'Uber', 'Figma', 'Notion',
];

export default function LogoTicker() {
  const doubled = [...companies, ...companies];
  return (
    <section style={{ background: '#041635', paddingTop: '52px', paddingBottom: '60px', overflow: 'hidden' }}>
      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .ticker-track { display: flex; animation: ticker 36s linear infinite; }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>

      <p style={{ textAlign: 'center', fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.3)', marginBottom: '28px', fontFamily: 'var(--font-body)', letterSpacing: '0.02em', padding: '0 16px' }}>
        300+ candidates have landed interviews globally through Reslink
      </p>

      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to right, #041635, transparent)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to left, #041635, transparent)', zIndex: 1, pointerEvents: 'none' }} />

        <div className="ticker-track" style={{ gap: '60px', paddingLeft: '40px' }}>
          {doubled.map((co, i) => (
            <span key={i} style={{ fontSize: '16px', fontWeight: 700, color: 'rgba(255,255,255,0.2)', whiteSpace: 'nowrap', letterSpacing: '-0.02em', flexShrink: 0 }}>
              {co}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
