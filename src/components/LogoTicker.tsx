const companies = [
  'Amazon', 'Meta', 'EY', 'Revolut', 'Accenture',
  'HubSpot', 'Adidas', 'Tesla', 'Coca-Cola', 'Google',
  'Microsoft', 'Salesforce',
];

export default function LogoTicker() {
  const doubled = [...companies, ...companies];

  return (
    <section className="py-16 border-t border-b" style={{ borderColor: '#EEEEF0' }}>
      <div className="container mb-8">
        <p className="text-center text-sm font-medium" style={{ color: '#9A9FA8' }}>
          Candidates using Reslink have landed jobs at
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }} />
        <div className="ticker-track gap-12 px-8">
          {doubled.map((company, i) => (
            <span
              key={i}
              className="text-lg font-bold whitespace-nowrap select-none"
              style={{ color: '#C8CBD2', letterSpacing: '-0.02em' }}
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
