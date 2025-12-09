import Stripe from 'stripe';
import { stripe } from '../stripe';

export async function getProductWithPromo(): Promise<GetProductWithPromo> {
  const price = await stripe.prices.retrieve(process.env.STRIPE_PRICE_ID!, {
    expand: ['product'],
  });

  const product = price.product as Stripe.Product;
  const basePrice = price.unit_amount! / 100;

  const coupons = await stripe.coupons.list({
    limit: 10,
    expand: ['data.applies_to'],
  });

  const [coupon] = coupons.data.filter((d) =>
    d.applies_to?.products.includes(product.id)
  );

  let promo: StripePromo | undefined = undefined;
  let finalPrice: string | null = null;

  if (coupon) {
    promo = {
      id: coupon.id,
      name: coupon.name!,
      percentOff: coupon.percent_off!,
      redeemBy: new Date(coupon.redeem_by! * 1000),
      timesRedeemed: coupon.times_redeemed,
    };

    finalPrice = (basePrice - (basePrice * promo.percentOff) / 100).toFixed(2);
  }

  return {
    name: product.name,
    description: product.description ?? '',
    image: product.images?.[0],
    originalPrice: basePrice.toString(),
    priceWithPromo: finalPrice,
    promo,
  };
}
