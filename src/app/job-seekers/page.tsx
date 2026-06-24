import Navbar from '@/components/Navbar';
import ScrollToTop from '@/components/ScrollToTop';
import Hero from '@/components/Hero';
import LogoTicker from '@/components/LogoTicker';
import ValueProp from '@/components/ValueProp';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function JobSeekers() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Hero />
        <LogoTicker />
        <ValueProp />
        <HowItWorks />
        <Features />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
