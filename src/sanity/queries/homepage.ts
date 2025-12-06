import { groq } from 'next-sanity';
import { sanityFetch } from '../lib/fetch';
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
  return sanityFetch<HomepageData>({
    query: HOMEPAGE_QUERY,
    tags: ['homepage', 'hero', 'about', 'gallery', 'testimonials', 'ebook'],
  });
}
