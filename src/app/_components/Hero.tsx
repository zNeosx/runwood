import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HomepageData } from '@/sanity/queries';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

type Props = {
  data: HomepageData['hero'];
};

const Hero = async ({ data }: Props) => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* <Image
          src={urlFor(heroData.image as SanityImageSource).url()}
          alt="Atelier RunWood"
          className="w-full h-full object-cover"
          fill
        /> */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/IMG-20251201-WA0008.jpg"
          className="size-full object-cover"
        >
          <source src={'/videos/hero.mp4'} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight text-balance">
            {data?.title}
          </h1>
          <p className="text-xl md:text-2xl text-foreground max-w-2xl mx-auto text-balance">
            {data?.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href={'/galerie'}
              className={cn(
                buttonVariants({
                  size: 'lg',
                })
              )}
            >
              Voir les créations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href={'/galerie'}
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'lg',
                })
              )}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Apprendre à fabriquer
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
