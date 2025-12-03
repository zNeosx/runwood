import Navigation from '@/components/Navigation';
import About from './_components/About';
import Gallery from './_components/Gallery';
import Hero from './_components/Hero';
import Testimonials from './_components/Testimonials';
import Ebook from './_components/Ebook';
import Footer from './_components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Gallery />
      {/* <Video /> */}
      <Testimonials />
      <Ebook />
      <Footer />
    </div>
  );
}
