import { Button } from '@/components/ui/button';
import { Hammer, Leaf, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const About = () => {
  const values = [
    {
      icon: Hammer,
      title: 'Artisanat',
      description: 'Chaque pièce est unique, fabriquée à la main avec passion',
    },
    {
      icon: Leaf,
      title: 'Durabilité',
      description: 'Recyclage de palettes pour donner une seconde vie au bois',
    },
    {
      icon: Heart,
      title: 'Authenticité',
      description:
        'Un savoir-faire traditionnel au service de créations modernes',
    },
  ];

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-strong">
            <Image
              src="/images/about-craftsman.jpg"
              alt="Artisan au travail"
              fill
              className="object-cover hover-lift"
            />
          </div>

          {/* Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold">
              À Propos
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              L&apos;Art du Bois Recyclé
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Chez RunWood, chaque meuble est créé à partir de palettes
              recyclées, poncé, assemblé et fini à la main. Une approche
              artisanale, durable et authentique qui donne une seconde vie au
              bois tout en créant des pièces uniques pour votre intérieur.
            </p>

            {/* Values Grid */}
            <div className="grid gap-6 pt-4">
              {values.map((value) => (
                <div key={value.title} className="flex gap-4 items-start group">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <value.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary mb-1">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" variant="default" asChild className="mt-4">
              <Link href="/contact">En Savoir Plus</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
