import { groq } from 'next-sanity';
import { sanityFetch } from '../lib/live';
import type {
  Hero,
  About,
  Gallery,
  Testimonials,
  Ebook,
} from '../../../sanity.types';

export type HomepageData = {
  hero: Hero | null;
  about: About | null;
  gallery: Gallery | null;
  testimonials: Testimonials | null;
  ebook: Ebook | null;
};

const HOMEPAGE_QUERY = groq`{
  "hero": *[_type == "hero"][0]{ title, description, image },
  "about": *[_type == "about"][0]{ title, description, image },
  "gallery": *[_type == "gallery"][0]{ title, description, images },
  "testimonials": *[_type == "testimonials"][0]{ title, items },
  "ebook": *[_type == "ebook"][0]{ title, description, cover, ctaText, ctaLink }
}`;

export async function getHomepage(): Promise<HomepageData> {
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
    tags: ['homepage', 'hero', 'about', 'gallery', 'testimonials', 'ebook'],
  });

  return homepage.data;
}
