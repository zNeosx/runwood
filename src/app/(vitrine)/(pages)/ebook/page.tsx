import { BuyButton } from '@/components/buy-button';
import { DynamicBreadcrumb } from '@/components/dynamic-breadcrumb';
import { Check } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const EbookPage = () => {
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
              E-Book : Le Guide Complet du Travail de la Palette
            </h1>
            <p className="text-xl text-muted-foreground">
              Maîtrisez l&apos;art de la transformation de palettes avec notre
              guide complet. Plus de 150 pages d&apos;expertise et de
              savoir-faire.
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-highlight/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 animate-fade-in">
              <p className="inline-block px-4 py-2 bg-highlight/20 backdrop-blur-sm text-highlight rounded-full text-sm font-semibold">
                E-Book Exclusif
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Tout ce qu&apos;il faut savoir pour créer vos propres meubles en
                palette
              </h2>

              {/* Features */}
              <ul className="grid sm:grid-cols-2 gap-4 pt-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-highlight flex items-center justify-center mt-0.5">
                      <Check
                        className="w-4 h-4 text-background"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Price & CTA */}
              <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <p>
                  <span className="text-muted-foreground text-sm mb-1">
                    Prix de lancement
                  </span>
                  <span className="text-4xl font-bold text-foreground">
                    14,99€
                    <span className="text-xl text-muted-foreground line-through ml-2">
                      29€
                    </span>
                  </span>
                </p>
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
                  src={'/images/ebook.jpg'}
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
