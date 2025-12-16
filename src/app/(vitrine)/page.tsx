import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';
import AboutWrapper from '../_components/about.wrapper';
import Ebook from '../_components/Ebook';
import GalleryWrapper from '../_components/gallery.wrapper';
import HeroWrapper from '../_components/hero.wrapper';
import Testimonials from '../_components/Testimonials';
import AboutSkeleton from '../_components/about-skeleton';
import EbookWrapper from '../_components/ebook-wrapper';
import GallerySkeleton from '../_components/gallery-skeleton';

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
      <Suspense fallback={<AboutSkeleton />}>
        <AboutWrapper />
      </Suspense>
      <Suspense fallback={<GallerySkeleton />}>
        <GalleryWrapper />
      </Suspense>
      <Testimonials />
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        <EbookWrapper />
      </Suspense>
    </div>
  );
}
