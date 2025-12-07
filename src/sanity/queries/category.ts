import { groq } from 'next-sanity';
import { sanityFetch } from '../lib/live';
import { Category } from '../../../sanity.types';

const CATEGORIES_QUERY = groq`*[_type == "category"] | order(name asc) {
  _id,
  name,
  slug
}`;

export async function getCategories(): Promise<Category[]> {
  const { data } = await sanityFetch({
    query: CATEGORIES_QUERY,
    tags: ['category'],
  });
  return data;
}
