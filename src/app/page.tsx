import Navbar from '@/components/Navbar';
import HomeHero from '@/components/HomeHero';
import LogoTicker from '@/components/LogoTicker';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HomeHero />
        <LogoTicker />
      </main>
      <Footer />
    </>
  );
}
