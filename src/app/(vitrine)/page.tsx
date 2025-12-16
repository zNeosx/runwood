import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';
import AboutWrapper from '../_components/about.wrapper';
import Ebook from '../_components/Ebook';
import GalleryWrapper from '../_components/gallery.wrapper';
import HeroWrapper from '../_components/hero.wrapper';
import Testimonials from '../_components/Testimonials';

export const revalidate = 3600;

export default async function Home() {
  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        <HeroWrapper />
      </Suspense>
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        <AboutWrapper />
      </Suspense>
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        <GalleryWrapper />
      </Suspense>
      <Testimonials />
      <Ebook />
    </div>
  );
}
