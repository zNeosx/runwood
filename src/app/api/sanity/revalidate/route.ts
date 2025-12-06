import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // 1. Vérifie que c'est bien Sanity qui appelle (sécurité)
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  // 2. Récupère le type de document modifié
  const body = await request.json();
  const { _type } = body; // ex: "hero"

  if (_type) {
    // 3. Invalide le cache pour ce type
    revalidateTag(_type); // invalide le tag 'hero'

    // 4. Invalide aussi la homepage si c'est une section
    if (['hero', 'about', 'gallery', 'testimonials', 'ebook'].includes(_type)) {
      revalidateTag('homepage');
    }

    return NextResponse.json({ revalidated: true, tag: _type });
  }

  return NextResponse.json({ revalidated: false });
}
