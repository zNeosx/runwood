import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, studioUrl } from '../env';
console.log('dataset', dataset);
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  stega: {
    studioUrl,
  },
});
