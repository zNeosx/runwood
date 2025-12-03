import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Gallery = () => {
  // Placeholder gallery items - will be replaced with actual images
  const galleryItems = [
    {
      id: 1,
      title: "Salon d'extérieur",
      category: 'Extérieur',
      image: '/images/IMG-20251201-WA0005.jpg',
      span: 'lg:col-span-2 lg:row-span-2',
    },
    {
      id: 2,
      title: 'Table basse géométrique',
      category: 'Tables',
      image: '/images/IMG-20251201-WA0016.jpg',
      span: 'lg:col-span-1 lg:row-span-1',
    },
    {
      id: 3,
      title: 'Jardinière à étages',
      category: 'Jardin',
      image: '/images/IMG-20251201-WA0009.jpg',
      span: 'lg:col-span-1 lg:row-span-1',
    },
    {
      id: 4,
      title: 'Meuble TV rustique',
      category: 'Intérieur',
      image: '/images/IMG-20251201-WA0013.jpg',
      span: 'lg:col-span-1 lg:row-span-2',
    },
    {
      id: 5,
      title: "Banc d'entrée",
      category: 'Mobilier',
      image:
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
      span: 'lg:col-span-2 lg:row-span-1',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          {/* <div className="inline-block px-4 py-2 bg-highlight/10 text-highlight rounded-full text-sm font-semibold mb-4">
            Nos Créations
          </div> */}
          <Badge variant={'highlight'} size="lg" className="mb-4">
            Nos Créations
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Galerie de Réalisations
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez nos meubles uniques, entièrement fabriqués à partir de
            palettes recyclées
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12 animate-slide-up">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl ${item.span} h-64 lg:h-auto`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 bg-highlight text-highlight-foreground text-xs font-semibold rounded-full mb-2">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" variant="default" asChild>
            <Link href="/galerie">
              Voir Toute la Galerie
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
