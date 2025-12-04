import Navigation from '@/components/Navigation';
import About from '../_components/About';
import Gallery from '../_components/Gallery';
import Hero from '../_components/Hero';
import HeroSkeleton from '../_components/HeroSkeleton';
import Testimonials from '../_components/Testimonials';
import Ebook from '../_components/Ebook';
import Footer from '../_components/Footer';
import { Suspense } from 'react';

// Revalidate every hour (3600 seconds)
export const revalidate = 3600;

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <About />
      <Gallery />
      {/* <Video /> */}
      <Testimonials />
      <Ebook />
      <Footer />
    </div>
  );
}
