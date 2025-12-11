import { groq } from 'next-sanity';
import { sanityFetch } from '../lib/live';
import type {
  HeroSection,
  AboutSection,
  Gallery,
  TestimonialsSection,
  EbookSection,
  HOMEPAGE_QUERYResult,
} from '../../../sanity.types';

export type HomepageData = {
  hero: HeroSection | null;
  about: AboutSection | null;
  gallery: {
    title: string | null;
    subtitle: string | null;
    photos: Gallery[];
  } | null;
  testimonials: TestimonialsSection | null;
  ebook: EbookSection | null;
};

const HOMEPAGE_QUERY = groq`{
  "hero": *[_type == "heroSection"][0]{ title, description, image },
  "about": *[_type == "aboutSection"][0]{ title, description, features },
  "gallery": {
    "title": *[_type == "gallerySection"][0].title,
    "subtitle": *[_type == "gallerySection"][0].subtitle,
    "maxPhotos": *[_type == "gallerySection"][0].maxPhotos,
    "photos": *[_type == "gallery" && featured == true] | order(order asc) {
      _id,
      name,
      description,
      image,
      "category": category->{ _id, name, slug }
    }
  },
  "testimonials": *[_type == "testimonialsSection"][0]{ title, items },
  "ebook": *[_type == "ebookSection"][0]{ title, description, cover, ctaText, ctaLink }
}`;

export async function getHomepage(): Promise<HOMEPAGE_QUERYResult> {
  // try {
  // const hommepage = await sanityFetch<HomepageData>({
  //   query: HOMEPAGE_QUERY,
  //   tags: ['homepage', 'hero', 'about', 'gallery', 'testimonials', 'ebook'],
  // });

  //   return hommepage.data;
  // } catch (error) {
  //   console.error('Erreur Sanity (settings):', error);
  //   return;
  // }
  const homepage = await sanityFetch({
    query: HOMEPAGE_QUERY,
    tags: [
      'homepage',
      'hero',
      'about',
      'gallerySection',
      'testimonials',
      'ebook',
    ],
  });

  return homepage.data;
}
