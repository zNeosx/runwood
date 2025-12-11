// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from 'next-sanity/live';
import { client } from './client';

export const { sanityFetch, SanityLive } = defineLive({
  client,
  // Uniquement serverToken pour éviter d'exposer le token côté client
  // Le browserToken est optionnel et sera undefined (mode lecture publique seulement)
  serverToken: process.env.SANITY_VIEWER_TOKEN,
  browserToken: process.env.NEXT_PUBLIC_SANITY_VIEWER_TOKEN, // Peut rester undefined
});
