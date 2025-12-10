// schemaTypes/index.ts
import * as pages from './pages';
import * as sections from './sections';
import * as documents from './documents';
import * as objects from './objects';
import * as taxonomies from './taxonomies';
import * as settings from './settings';
import { SchemaTypeDefinition } from 'sanity';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Pages (singletons)
    ...Object.values(pages),
    // Sections accueil (singletons)
    ...Object.values(sections),
    // Documents (multiples)
    ...Object.values(documents),
    // Objects réutilisables
    ...Object.values(objects),
    // Taxonomies
    ...Object.values(taxonomies),
    // Settings
    ...Object.values(settings),
  ],
};
