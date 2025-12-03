import { type SchemaTypeDefinition } from 'sanity';
import hero from './hero';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero],
};
