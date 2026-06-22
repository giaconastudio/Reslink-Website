'use client';

import Navbar from '@/components/Navbar';

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '68px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <iframe
          src="https://reslink-company.vercel.app/job-board"
          style={{ flex: 1, width: '100%', border: 'none' }}
          title="Reslink Job Board"
        />
      </div>
    </>
  );
}
