import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LogoTicker from '@/components/LogoTicker';
import ValueProp from '@/components/ValueProp';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import B2BBand from '@/components/B2BBand';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoTicker />
        <ValueProp />
        <HowItWorks />
        <Features />
        <Testimonials />
        <B2BBand />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
