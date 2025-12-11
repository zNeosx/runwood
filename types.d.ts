type GalleryItem = {
  title: string;
  category;
  src: string;
};

type StripePromo = {
  id: string;
  name: string | null;
  percentOff?: number;
  amountOff?: number;
  redeemBy: Date | null;
};

type EbookProduct = {
  priceId: string;
  name: string;
  description: string | null;
  image: string | undefined;
  originalPrice: number | null;
  price: number;
  promo: StripePromo | null;
};
