import AnimatedMasonryGallery from '@/components/animated-masonry-gallery';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { HOMEPAGE_QUERYResult } from '../../../sanity.types';
type Props = {
  data: HOMEPAGE_QUERYResult['gallery'];
};

const Gallery = async ({ data }: Props) => {
  return (
    <section aria-labelledby="gallery-title" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="text-center max-w-2xl mx-auto mb-6 animate-fade-in">
          <p>
            <Badge variant={'highlight'} size="lg" className="mb-4">
              Nos Créations
            </Badge>
          </p>
          <h2
            id="gallery-title"
            className="text-4xl md:text-5xl font-bold text-foreground mb-3 title-with-lines"
          >
            {data?.title}
          </h2>
          <p className="text-lg text-muted-foreground">{data?.subtitle}</p>
        </header>

        {data?.photos && <AnimatedMasonryGallery items={data?.photos} />}

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
