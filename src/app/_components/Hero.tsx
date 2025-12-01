import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={'/images/hero-workshop.jpg'}
          alt="Atelier RunWood"
          className="w-full h-full object-cover"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/50 to-primary/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight text-balance">
            Transformez le Bois en Œuvres Uniques
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto text-balance">
            Meubles artisanaux créés à la main à partir de palettes recyclées.
            Authenticité, durabilité et savoir-faire français.
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
