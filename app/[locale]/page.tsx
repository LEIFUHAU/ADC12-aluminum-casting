import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Products from '@/components/Products';
import Applications from '@/components/Applications';
import MaterialSpec from '@/components/MaterialSpec';
import AboutUs from '@/components/AboutUs';
import Process from '@/components/Process';
import InquiryCTA from '@/components/InquiryCTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Stats />
      <Products />
      <Applications />
      <MaterialSpec />
      <AboutUs />
      <Process />
      <InquiryCTA />
      <Contact />
      <Footer />
    </main>
  );
}
