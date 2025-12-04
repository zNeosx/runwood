// sanity/lib/fetch.ts
import { client, previewClient } from './client';
import { draftMode } from 'next/headers';

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 3600,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T> {
  const isDraftMode = (await draftMode()).isEnabled;

  // En mode draft/preview → pas de cache, données live
  if (isDraftMode) {
    console.log('🔴 SANITY FETCH [DRAFT MODE] - No cache');
    return previewClient.fetch<T>(query, params);
  }

  console.log(
    `🟢 SANITY FETCH [CACHED] - Tags: [${tags.join(', ')}] - Revalidate: ${revalidate}s`
  );

  const start = performance.now();
  // En production ou dev normal → cache Next.js
  const result = client.fetch<T>(query, params, {
    next: {
      revalidate,
      tags,
    },
  });

  const duration = performance.now() - start;

  console.log(`⏱️ Fetch duration: ${duration.toFixed(2)}ms`);
  return result;
}
