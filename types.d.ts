type GalleryItem = {
  title: string;
  category;
  src: string;
};

type StripePromo = {
  id: string;
  name: string;
  percentOff: number;
  redeemBy: Date;
  timesRedeemed: number;
};

type GetProductWithPromo = {
  name: string;
  description: string;
  image: string;
  originalPrice: string;
  priceWithPromo: string | null;
  promo?: StripePromo;
};
