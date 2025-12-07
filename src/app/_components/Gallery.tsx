import AnimatedMasonryGallery from '@/components/animated-masonry-gallery';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Gallery = () => {
  const galleryItems = [
    {
      id: '1',
      title: "Salon d'extérieur",
      category: 'Extérieur',
      src: '/images/IMG-20251205-WA0002.jpg',
      url: '#',
      width: 600,
      height: 300,
      span: 'lg:col-span-2 lg:row-span-2',
    },
    {
      id: '2',
      title: 'Table basse géométrique',
      category: 'Tables',
      src: '/images/IMG-20251201-WA0016.jpg',
      url: '#',
      width: 250,
      height: 600,
      span: 'lg:col-span-1 lg:row-span-1',
    },
    {
      id: '3',
      title: 'Jardinière à étages',
      category: 'Jardin',
      src: '/images/IMG-20251205-WA0004.jpg',
      url: '#',
      width: 400,
      height: 250,
      span: 'lg:col-span-1 lg:row-span-1',
    },
    {
      id: '4',
      title: 'Meuble TV rustique',
      category: 'Intérieur',
      src: '/images/IMG-20251201-WA0013.jpg',
      url: '#',
      width: 300,
      height: 300,
      span: 'lg:col-span-1 lg:row-span-2',
    },
    {
      id: '5',
      title: "Banc d'entrée",
      category: 'Mobilier',
      src: '/images/IMG-20251205-WA0003.jpg',
      url: '#',
      width: 800,
      height: 400,
      span: 'lg:col-span-2 lg:row-span-1',
    },
    {
      id: '6',
      title: "Banc d'entrée",
      category: 'Mobilier',
      src: '/images/IMG-20251201-WA0009.jpg',
      url: '#',
      width: 200,
      height: 400,
      span: 'lg:col-span-2 lg:row-span-1',
    },
  ];

  return (
    <section aria-labelledby="gallery-title" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="text-center max-w-2xl mx-auto mb-6 animate-fade-in">
          {/* <div className="inline-block px-4 py-2 bg-highlight/10 text-highlight rounded-full text-sm font-semibold mb-4">
            Nos Créations
          </div> */}
          <p>
            <Badge variant={'highlight'} size="lg" className="mb-4">
              Nos Créations
            </Badge>
          </p>
          {/* <div className="mb-4"> */}
          <h2
            id="gallery-title"
            className="text-4xl md:text-5xl font-bold text-foreground mb-3 title-with-lines"
          >
            Galerie de Réalisations
          </h2>
          {/* <div className="h-px w-150 mx-auto bg-linear-to-r from-transparent via-foreground/20 to-transparent"></div>
          </div> */}
          <p className="text-lg text-muted-foreground">
            Découvrez nos meubles uniques, entièrement fabriqués à partir de
            palettes recyclées
          </p>
        </header>

        {/* Masonry Grid */}
        {/* <MasonryGrid items={galleryItems} /> */}
        {/* <EmblaCarousel2 /> */}
        <AnimatedMasonryGallery />
        {/* <MasonryGallery /> */}
        {/* CTA */}
        <p className="text-center">
          <Link
            href={'/galerie'}
            className={buttonVariants({
              size: 'lg',
            })}
          >
            Voir Toute la Galerie
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Gallery;
