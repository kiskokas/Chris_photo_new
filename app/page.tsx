import Header from './components/Header';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import ScrollToTop from './components/ScrollToTop';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <HomeSection />
      <AboutSection />
      <Gallery />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Home;