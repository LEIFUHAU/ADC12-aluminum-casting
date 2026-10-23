import Navigation from '@/components/Navigation';
import PageLoader from '@/components/PageLoader';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Applications from '@/components/Applications';
import Products from '@/components/Products';
import AboutUs from '@/components/AboutUs';
import FactoryGallery from '@/components/FactoryGallery';
import Process from '@/components/Process';
import MaterialSpec from '@/components/MaterialSpec';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="page-shell">
      <PageLoader />
      <Navigation />
      <Hero />
      <Stats />
      <Applications />
      <Products />
      <AboutUs />
      <FactoryGallery />
      <Process />
      <MaterialSpec />
      <Contact />
      <Footer />
    </main>
  );
}
