import Header from './components/Header';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import PriceSection from './components/PriceSection';
import ContactSection from './components/ContactSection';
import ScrollToTop from './components/ScrollToTop';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <Header />
      <HomeSection />
      <AboutSection />
      <PriceSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
      <SpeedInsights />
    </div>
  );
}