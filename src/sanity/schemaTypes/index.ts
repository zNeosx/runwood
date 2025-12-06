import { type SchemaTypeDefinition } from 'sanity';
import hero from './hero';
import settings from './settings';
import about from './about';
import ebook from './ebook';
import gallery from './gallery';
import testimonials from './testimonials';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero, about, gallery, testimonials, ebook, settings],
};
