import { Button } from '@/components/ui/button';
import { sanityFetch } from '@/sanity/lib/live';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { groq } from 'next-sanity';
import Link from 'next/link';
import type { Hero as HeroType } from '../../../sanity.types';

const HERO_QUERY = groq`*[_type == "hero"][0]{ _id, title, description, image }`;

const Hero = async () => {
  const { data } = await sanityFetch({
    query: HERO_QUERY,
  });

  const heroData = data as HeroType;
  console.log('hero', heroData);
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
          className="w-full h-full object-contain"
        >
          <source src={'/videos/VID-20251201-WA0001.mp4'} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight text-balance">
            {heroData.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
            {heroData.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="xl"
              variant="default"
              // className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto"
              asChild
            >
              <Link href="/galerie">
                Voir les Créations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              // className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 h-auto"
              asChild
            >
              <Link href="/videos">
                <PlayCircle className="mr-2 h-5 w-5" />
                Apprendre à Fabriquer
              </Link>
            </Button>
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
