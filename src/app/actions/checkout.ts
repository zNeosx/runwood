// app/actions/checkout.ts
'use server';

import { redirect } from 'next/navigation';
import { stripe } from '@/lib/stripe';
import { getActiveCoupon } from '@/lib/stripe/queries';
import { EBOOK_PRICE_ID, Language } from '@/lib/stripe/config';

export async function createCheckoutSession(language: Language) {
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
