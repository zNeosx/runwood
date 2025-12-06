import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
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
    <section aria-labelledby="about-title" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <figure className="relative aspect-square rounded-2xl overflow-hidden shadow-strong">
            <Image
              src="/images/IMG-20251201-WA0012.jpg"
              alt="Artisan RunWood travaillant le bois de palette dans son atelier"
              fill
              className="object-cover object-top hover-lift"
            />
          </figure>

          {/* Content */}
          <div className="space-y-6 animate-fade-in">
            <Badge variant={'primaryLight'} size={'lg'}>
              À Propos
            </Badge>
            <h2
              id="about-title"
              className="text-4xl md:text-5xl font-bold text-foreground"
            >
              L&apos;Art du Bois Recyclé
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Chez RunWood, chaque meuble est créé à partir de palettes
              recyclées, poncé, assemblé et fini à la main. Une approche
              artisanale, durable et authentique qui donne une seconde vie au
              bois tout en créant des pièces uniques pour votre intérieur.
            </p>

            {/* Values Grid */}
            <ul className="grid gap-6 pt-4">
              {values.map((value) => (
                <li key={value.title} className="flex gap-4 items-start group">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/60 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <value.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href={'/contact'}
              className={buttonVariants({
                size: 'lg',
                className: 'mt-4',
              })}
            >
              En Savoir Plus
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
