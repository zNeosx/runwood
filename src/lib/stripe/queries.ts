import Stripe from 'stripe';
import { stripe } from '../stripe';

export async function getActiveCoupon() {
  const coupons = await stripe.coupons.list({
    limit: 10,
    expand: ['data.applies_to'],
  });

  return coupons.data.find((coupon) => coupon.valid) || null;
}

export async function getEbookProduct(): Promise<EbookProduct> {
  const price = await stripe.prices.retrieve(
    process.env.STRIPE_EBOOK_PRICE_ID!,
    {
      expand: ['product'],
    }
  );

  const product = price.product as Stripe.Product;
  const basePrice = price.unit_amount! / 100;

  const coupon = await getActiveCoupon();

  const applicableCoupon = coupon?.applies_to?.products.includes(product.id);

  let promo: StripePromo | null = null;
  let finalPrice = basePrice;

  if (applicableCoupon && coupon) {
    if (coupon.percent_off) {
      finalPrice = basePrice * (1 - coupon.percent_off / 100);
      promo = {
        id: coupon.id,
        name: coupon.name!,
        percentOff: coupon.percent_off,
        redeemBy: coupon.redeem_by ? new Date(coupon.redeem_by * 1000) : null,
      };
    } else if (coupon.amount_off) {
      finalPrice = basePrice - coupon.amount_off / 100;
      promo = {
        id: coupon.id,
        name: coupon.name!,
        amountOff: coupon.amount_off / 100,
        redeemBy: coupon.redeem_by ? new Date(coupon.redeem_by * 1000) : null,
      };
    }
  }

  return {
    priceId: price.id,
    name: product.name,
    description: product.description,
    image: product.images?.[0],
    originalPrice: promo ? basePrice : null,
    price: Math.round(finalPrice * 100) / 100,
    promo,
  };
}
