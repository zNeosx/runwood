import { getHomepage } from '@/sanity/queries';
import About from '../_components/About';
import Ebook from '../_components/Ebook';
import Gallery from '../_components/Gallery';
import Hero from '../_components/Hero';
import Testimonials from '../_components/Testimonials';

export const revalidate = 3600;

export default async function Home() {
  const homepage = await getHomepage();
  return (
    <div className="min-h-screen">
      <Hero data={homepage.hero} />
      <About />
      <Gallery />
      <Testimonials />
      <Ebook />
    </div>
  );
}
