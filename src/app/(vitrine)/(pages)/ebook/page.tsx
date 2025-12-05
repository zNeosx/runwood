import { BuyButton } from '@/components/buy-button';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-4 px-4 border-b border-border/50">
        <div className="container mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-16 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-highlight/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-4 py-2 bg-highlight/20 backdrop-blur-sm text-highlight rounded-full text-sm font-semibold">
                E-Book Exclusif
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Le <span className="text-highlight">Guide Complet</span> du
                Travail
                <br className="hidden md:block" />
                <span className="md:whitespace-nowrap"> de la Palette</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Maîtrisez l&apos;art de la transformation de palettes avec notre
                guide complet. Plus de 150 pages d&apos;expertise et de
                savoir-faire.
              </p>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-highlight flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                    </div>
                    <p className="text-muted-foreground">{feature}</p>
                  </div>
                ))}
              </div>

              {/* Price & CTA */}
              <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">
                    Prix de lancement
                  </p>
                  <p className="text-4xl font-bold text-foreground">
                    14,99€
                    <span className="text-xl text-muted-foreground line-through ml-2">
                      29€
                    </span>
                  </p>
                </div>
                {/* <Button
                  size="lg"
                  onClick={handlePurchase}
                  disabled={isLoading}
                  className="bg-highlight text-primary hover:bg-highlight/90 text-lg px-8 py-6 h-auto"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  {isLoading ? 'Chargement...' : "Acheter l'E-Book"}
                </Button> */}
                <BuyButton size={'lg'} />
              </div>

              {/* Guarantee */}
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  🔒 Paiement sécurisé par Stripe • Téléchargement immédiat
                  après achat
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative animate-scale-in flex items-center justify-center">
              <div className="relative z-10 hover-lift w-full aspect-4/5 max-w-md lg:max-w-lg rounded-2xl">
                <Image
                  src={'/images/ebook.jpg'}
                  alt="E-book RunWood"
                  className="rounded-2xl shadow-strong object-cover"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute top-8 right-8 w-64 h-64 bg-highlight/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EbookPage;
