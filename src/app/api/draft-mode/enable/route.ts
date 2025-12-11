import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { client } from '@/sanity/lib/client';
import { NextRequest, NextResponse } from 'next/server';

// Handler protégé par secret
async function GET(request: NextRequest) {
  // Vérifier le secret dans les query params
  const secret = request.nextUrl.searchParams.get('secret');

  if (!secret || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    );
  }

  // Utiliser le handler de next-sanity
  const enableDraftMode = defineEnableDraftMode({
    client: client.withConfig({
      token: process.env.SANITY_VIEWER_TOKEN,
    }),
  });

  return enableDraftMode.GET(request);
}

export { GET };
