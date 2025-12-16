import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { client } from '@/sanity/lib/client';
import { NextRequest, NextResponse } from 'next/server';

// Handler protégé par secret
async function GET(request: NextRequest) {
  // Vérifier le secret dans le header Authorization OU dans les query params (fallback)
  const authHeader = request.headers.get('authorization');
  const querySecret = request.nextUrl.searchParams.get('secret');

  const secret = authHeader?.replace('Bearer ', '') || querySecret;

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
