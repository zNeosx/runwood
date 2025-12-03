'use server';

import { redirect } from 'next/navigation';
import { stripe } from '@/lib/stripe';

export async function createCheckoutSession() {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1Sa9q3AFeRw9L4Fzk726y15R',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
  });

  redirect(session.url!);
}
