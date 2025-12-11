import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { BookOpen, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { HOMEPAGE_QUERYResult } from '../../../sanity.types';

type Props = {
  data: HOMEPAGE_QUERYResult['ebook'];
};

const Ebook = async ({ data }: Props) => {
  const featuresLeft = [
    '10+ projets de meubles détaillés',
    "Techniques d'assemblage professionnelles",
    "Liste complète d'outils nécessaires",
  ];

  const featuresRight = [
    'Plans et mesures précises',
    'Guide des finitions et traitements',
    'Conseils de sécurité et bonnes pratiques',
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-highlight/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 animate-fade-in">
            <Badge variant={'highlight'} size={'lg'}>
              E-Book Exclusif
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Le <span className="text-highlight">Guide Complet</span> du
              Travail
              <br className="hidden md:block" />
              <span className="md:whitespace-nowrap"> de la Palette</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Maîtrisez l&apos;art de la transformation de palettes avec notre
              guide complet. Plus de 150 pages d&apos;expertise et de
              savoir-faire.
            </p>

            {/* Features - 2 colonnes séparées */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-4">
              <div className="space-y-4">
                {featuresLeft.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-highlight flex items-center justify-center mt-0.5">
                      <Check
                        className="w-4 h-4 text-background"
                        strokeWidth={3}
                      />
                    </div>
                    <p className="text-muted-foreground">{feature}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {featuresRight.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-highlight flex items-center justify-center mt-0.5">
                      <Check
                        className="w-4 h-4 text-background"
                        strokeWidth={3}
                      />
                    </div>
                    <p className="text-muted-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & CTA */}
            <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link
                href={'/ebook'}
                className={buttonVariants({ variant: 'highlight', size: 'lg' })}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                En savoir plus
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-scale-in flex items-center justify-center">
            <div className="relative z-10 hover-lift w-full aspect-4/5 max-w-md lg:max-w-lg">
              <Image
                src={'/images/ebook-2.jpg'}
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
  );
};

export default Ebook;
