const companies = ['Amazon', 'Meta', 'EY', 'Revolut', 'Accenture', 'HubSpot', 'Adidas', 'Tesla', 'Coca-Cola', 'Google', 'Microsoft', 'Salesforce'];

export default function LogoTicker() {
  const doubled = [...companies, ...companies];
  return (
    <section style={{ background: '#041635', paddingTop: '56px', paddingBottom: '64px', overflow: 'hidden' }}>
      <p style={{ textAlign: 'center', fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.35)', marginBottom: '28px', fontFamily: 'var(--font-body)' }}>
        Candidates using Reslink have landed jobs at
      </p>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to right, #041635, transparent)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to left, #041635, transparent)', zIndex: 1, pointerEvents: 'none' }} />
        <div className="ticker-track" style={{ gap: '56px', paddingLeft: '40px' }}>
          {doubled.map((co, i) => (
            <span key={i} style={{ fontSize: '18px', fontWeight: 700, color: 'rgba(255,255,255,0.28)', whiteSpace: 'nowrap', letterSpacing: '-0.02em', flexShrink: 0 }}>
              {co}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
