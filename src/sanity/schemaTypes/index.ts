import { type SchemaTypeDefinition } from 'sanity';
import category from './category';
import about from './sections/about';
import ebook from './sections/ebook';
import gallerySection from './sections/gallery-section';
import hero from './sections/hero';
import testimonials from './sections/testimonials';
import settings from './settings';
import gallery from './pages/gallery';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    about,
    gallerySection,
    gallery,
    category,
    testimonials,
    ebook,
    settings,
  ],
};
