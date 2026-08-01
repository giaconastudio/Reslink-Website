import Navbar from '@/components/Navbar';
import HomeHero from '@/components/HomeHero';
import LogoTicker from '@/components/LogoTicker';
import HomeIndividuals from '@/components/HomeIndividuals';
import HomeOrganizations from '@/components/HomeOrganizations';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HomeHero />
        <LogoTicker />
        <HomeIndividuals />
        <HomeOrganizations />
        <CTA
          heading={<>Ready to<br /><span style={{ color: '#D8F950' }}>get started?</span></>}
          body="Individuals can create a Reslink free in minutes. Hiring teams and career centers can book a walkthrough with our team."
          primaryLabel="Create your Reslink free"
          secondaryLabel="Book a demo"
          secondaryHref="/contact"
          footnote="Free for individuals · No credit card required"
        />
      </main>
      <Footer />
    </>
  );
}
