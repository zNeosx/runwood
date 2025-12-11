// app/actions/checkout.ts
'use server';

import { redirect } from 'next/navigation';
import { stripe } from '@/lib/stripe';
import { getActiveCoupon } from '@/lib/stripe/queries';
import { EBOOK_PRICE_ID, Language } from '@/lib/stripe/config';
import { checkoutRateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';

export async function createCheckoutSession(language: Language) {
  // Rate limiting par IP : 10 sessions par heure
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'anonymous';

  const { success, limit, remaining, reset } = await checkoutRateLimit.limit(ip);

  if (!success) {
    throw new Error(
      `Trop de tentatives. Limite : ${limit} sessions/heure. Réessayez dans ${Math.ceil((reset - Date.now()) / 1000 / 60)} minutes.`
    );
  }

  const coupon = await getActiveCoupon();

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: EBOOK_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: 'payment',
    metadata: {
      language,
    },
    invoice_creation: {
      enabled: true,
    },
    discounts: coupon ? [{ coupon: coupon.id }] : undefined,
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
  });

  redirect(session.url!);
}
