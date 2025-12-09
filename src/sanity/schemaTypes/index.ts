import { type SchemaTypeDefinition } from 'sanity';
import category from './category';
import about from './sections/about';
import ebookSection from './sections/ebookSection';
import gallerySection from './sections/gallery-section';
import hero from './sections/hero';
import testimonials from './sections/testimonials';
import settings from './settings';
import gallery from './pages/gallery';
import { ebook } from './pages/ebook';
import { seo } from './seo';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    about,
    gallerySection,
    gallery,
    category,
    testimonials,
    ebookSection,
    settings,
    ebook,
    seo,
  ],
};
