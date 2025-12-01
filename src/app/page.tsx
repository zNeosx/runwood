import Navigation from '@/components/Navigation';
import Hero from './_components/Hero';
import About from './_components/About';
import Gallery from './_components/Gallery';
import Video from './_components/Video';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Gallery />
      {/* <Video /> */}
    </div>
  );
}
