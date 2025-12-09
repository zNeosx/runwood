import { BuyButton } from '@/components/buy-button';
import { DynamicBreadcrumb } from '@/components/dynamic-breadcrumb';
import { Badge } from '@/components/ui/badge';
import { BorderBeam } from '@/components/ui/border-beam';
import { Card, CardContent } from '@/components/ui/card';
import { getProductWithPromo } from '@/lib/stripe/queries';
import { urlFor } from '@/sanity/lib/image';
import { getEbookPage } from '@/sanity/queries/ebook';
import { Check } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const EbookPage = async () => {
  const ebookPage = await getEbookPage();
  const product = await getProductWithPromo();

  console.log('ebookPage', ebookPage);

  const features = [
    '10+ projets de meubles détaillés',
    'Plans et mesures précises',
    "Techniques d'assemblage professionnelles",
    'Guide des finitions et traitements',
    "Liste complète d'outils nécessaires",
    'Conseils de sécurité et bonnes pratiques',
  ];
  return (
    <>
      {/* Header */}
      <header className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
              {ebookPage?.pageTitle}
            </h1>
            <p className="text-xl text-muted-foreground">
              {ebookPage?.pageSubtitle}
            </p>
            <DynamicBreadcrumb className="justify-center py-4" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section
        aria-labelledby="ebook-title"
        className="py-16 relative overflow-hidden"
      >
        {/* Decorative Elements */}
        {/* <div className="absolute top-0 right-0 w-96 h-96 bg-highlight/10 rounded-full blur-3xl" /> */}
        {/* <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" /> */}

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 animate-fade-in">
              <Badge variant={'highlight'} size="lg">
                {ebookPage?.ebookTitle}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                {ebookPage?.tagline}
              </h2>

              {/* Features */}
              <ul className="grid sm:grid-cols-2 gap-4 pt-4">
                {ebookPage?.features?.map((feature) => (
                  <li key={feature._key} className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-highlight flex items-center justify-center mt-0.5">
                      <Check
                        className="w-4 h-4 text-background"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="text-muted-foreground">
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {product.promo && (
                <Card className='my-8 max-w-xl relative z-1 before:content-[""] before:absolute before:top-1/2 before:left-0 before:-translate-1/2 before:z-5 before:rounded-full before:size-8 before:bg-background after:content-[""] after:absolute after:top-1/2 after:left-full after:-translate-1/2 after:rounded-full after:size-8 after:bg-background after:z-5'>
                  <CardContent>
                    <div className="relative flex items-start justify-between z-1">
                      <div className="flex flex-col gap-4">
                        <span className="uppercase font-bold text-4xl">
                          {product.promo.percentOff}% OFF
                        </span>
                        <span className="text-lg md:text-2xl capitalize font-semibold">
                          {product.promo.name}
                        </span>
                      </div>
                      <div className="flex flex-col gap-px">
                        <span className="uppercase text-3xl text-primary font-bold">
                          {product.promo.id}
                        </span>
                        <span className="uppercase text-muted-foreground">
                          Coupon expire le{' '}
                          {new Intl.DateTimeFormat('fr-FR', {
                            month: '2-digit',
                            year: '2-digit',
                          }).format(product.promo.redeemBy)}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-40 size-32 bg-white/10 rounded-full blur-3xl z-5" />
                  </CardContent>
                  <BorderBeam className="z-2" duration={8} size={100} />
                </Card>
              )}

              {/* Price & CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm mb-1">
                    Prix
                  </span>
                  <div className="flex items-center gap-2">
                    {/* {product.priceWithPromo && (
                      <span className="text-4xl font-bold text-foreground">
                        {product.priceWithPromo}€
                      </span>
                    )} */}
                    <span className="text-4xl text-foreground">
                      {product.originalPrice}€
                    </span>
                  </div>
                </div>
                <BuyButton size={'lg'} />
              </div>

              {/* Guarantee */}
              <p className="pt-4 border-t border-border/50 text-sm text-muted-foreground">
                🔒 Paiement sécurisé par Stripe • Téléchargement immédiat après
                achat
              </p>
            </div>

            {/* Image */}
            <figure className="relative animate-scale-in flex items-center justify-center">
              <div className="relative z-10 hover-lift w-full aspect-4/5 max-w-md lg:max-w-lg rounded-2xl">
                <Image
                  src={
                    ebookPage?.coverImage
                      ? urlFor(ebookPage?.coverImage).url()
                      : '/images/ebook.jpg'
                  }
                  alt="Couverture de l'e-book Le Guide Complet du Travail de la Palette"
                  className="rounded-2xl shadow-strong object-cover"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute top-8 right-8 w-64 h-64 bg-highlight/20 rounded-full blur-3xl" />
            </figure>
          </div>
        </div>
      </section>
    </>
  );
};

export default EbookPage;
