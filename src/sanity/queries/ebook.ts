import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../lib/live';

const EBOOK_PAGE_QUERY = defineQuery(`*[_type == "ebookPage"][0]{
  pageTitle,
  pageSubtitle,
  ebookTitle,
  tagline,
  coverImage,
  features[]{
    _key,
    text
  },
  seo {
    metaTitle,
    metaDescription,
    openGraphImage
  }
}`);

export async function getEbookPage() {
  const { data } = await sanityFetch({
    query: EBOOK_PAGE_QUERY,
    tags: ['ebookPage'],
  });
  return data;
}

// Pour les métadonnées Next.js
export async function getEbookMetadata() {
  const data = await getEbookPage();

  return {
    title: data?.seo?.metaTitle || data?.pageTitle || 'Ebook',
    description: data?.seo?.metaDescription || data?.pageSubtitle || '',
    openGraph: data?.seo?.openGraphImage
      ? {
          images: [{ url: data.seo.openGraphImage }],
        }
      : undefined,
  };
}
