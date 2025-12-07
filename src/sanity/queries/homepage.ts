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
  gallery: {
    title: string | null;
    subtitle: string | null;
    photos: Gallery[];
  } | null;
  testimonials: Testimonials | null;
  ebook: Ebook | null;
};

const HOMEPAGE_QUERY = groq`{
  "hero": *[_type == "hero"][0]{ title, description, image },
  "about": *[_type == "about"][0]{ title, description, features },
  "gallery": {
    "title": *[_type == "gallerySection"][0].title,
    "subtitle": *[_type == "gallerySection"][0].subtitle,
    "maxPhotos": *[_type == "gallerySection"][0].maxPhotos,
    "photos": *[_type == "gallery" && featured == true] | order(order asc) {
      _id,
      name,
      description,
      image,
      "category": category->{ name, slug }
    }
  },
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
