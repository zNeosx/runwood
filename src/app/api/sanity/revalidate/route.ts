import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { revalidateRateLimit } from '@/lib/rate-limit';
import { isValidSignatureNext } from '@/sanity/lib/signature';

export async function POST(request: NextRequest) {
  console.log('[DEBUG] Sanity revalidate API route');
  const bodyText = await request.text();
  // 1. Rate limiting pour éviter le spam de revalidation
  // const ip =
  //   request.headers.get('x-forwarded-for') ||
  //   request.headers.get('x-real-ip') ||
  //   'anonymous';

  // const { success, limit, reset } = await revalidateRateLimit.limit(ip);

  // if (!success) {
  //   const minutesLeft = Math.ceil((reset - Date.now()) / 1000 / 60);
  //   console.error(
  //     `⚠️ Rate limit dépassé pour revalidate. Limite: ${limit}/heure. Réessayez dans ${minutesLeft}min.`
  //   );
  //   return NextResponse.json(
  //     {
  //       message: 'Too many requests',
  //       retryAfter: minutesLeft,
  //     },
  //     { status: 429 }
  //   );
  // }

  // 2. Vérifie la signature Sanity
  // On passe le body en texte brut (bodyText)
  const signatureIsValid = await isValidSignatureNext(request, bodyText);
  if (!signatureIsValid) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }

  // 3. Récupère le type de document modifié
  let body;
  try {
    body = JSON.parse(bodyText); // 👈 ON UTILISE bodyText
  } catch {
    console.error('Failed to parse JSON body');
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }

  const { _type } = body; // ex: "hero"

  if (_type) {
    // 4. Invalide le cache pour ce type
    revalidateTag(_type); // invalide le tag 'hero'

    // 5. Invalide aussi la homepage si c'est une section
    if (
      [
        'heroSection',
        'aboutSection',
        'gallerySection',
        'testimonialsSection',
        'ebookSection',
      ].includes(_type)
    ) {
      revalidateTag('homepage');
    }

    console.log(`✅ Cache revalidated for tag: ${_type}`);
    return NextResponse.json({ revalidated: true, tag: _type });
  }

  return NextResponse.json({ revalidated: false });
}
