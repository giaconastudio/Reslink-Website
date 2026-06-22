'use client';

const companies = ['Amazon', 'Meta', 'EY', 'Revolut', 'Accenture', 'HubSpot', 'Adidas', 'Tesla', 'Coca-Cola', 'Google', 'Microsoft', 'Salesforce'];
const companies2 = ['Stripe', 'Apple', 'Netflix', 'Shopify', 'LinkedIn', 'Spotify', 'Airbnb', 'Uber', 'Figma', 'Notion', 'Dropbox', 'Slack'];

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        className={reverse ? 'ticker-track-rev' : 'ticker-track'}
        style={{ gap: '56px', paddingLeft: '40px' }}
      >
        {doubled.map((co, i) => (
          <span key={i} style={{ fontSize: '17px', fontWeight: 700, color: 'rgba(255,255,255,0.22)', whiteSpace: 'nowrap', letterSpacing: '-0.02em', flexShrink: 0 }}>
            {co}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function LogoTicker() {
  return (
    <section style={{ background: '#041635', paddingTop: '52px', paddingBottom: '60px', overflow: 'hidden' }}>
      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes ticker-rev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        .ticker-track { display: flex; animation: ticker 28s linear infinite; }
        .ticker-track-rev { display: flex; animation: ticker-rev 32s linear infinite; }
        .ticker-track:hover, .ticker-track-rev:hover { animation-play-state: paused; }
      `}</style>

      <p style={{ textAlign: 'center', fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.3)', marginBottom: '28px', fontFamily: 'var(--font-body)', letterSpacing: '0.02em' }}>
        Candidates using Reslink have landed jobs at
      </p>

      {/* Fade masks */}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '140px', background: 'linear-gradient(to right, #041635, transparent)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '140px', background: 'linear-gradient(to left, #041635, transparent)', zIndex: 1, pointerEvents: 'none' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <Row items={companies} />
          <Row items={companies2} reverse />
        </div>
      </div>
    </section>
  );
}
