import { type SchemaTypeDefinition } from 'sanity';
import hero from './hero';
import settings from './settings';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero, settings],
};
