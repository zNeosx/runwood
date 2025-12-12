import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { HOMEPAGE_QUERYResult } from '../../../sanity.types';

type Props = {
  data: HOMEPAGE_QUERYResult['about'];
};

const About = ({ data }: Props) => {
  return (
    <section aria-labelledby="about-title" className="py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <figure className="relative aspect-square rounded-full overflow-hidden shadow-strong">
              <Image
                src="/images/IMG-20251201-WA0012.jpg"
                alt="Artisan RunWood travaillant le bois de palette dans son atelier"
                fill
                className="object-cover object-top hover-lift z-1"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </figure>
          </div>

          {/* Content */}
          <div className="space-y-6 animate-fade-in">
            <Badge variant={'primaryLight'} size={'sm'}>
              À Propos
            </Badge>
            <h2
              id="about-title"
              className="text-4xl md:text-5xl font-bold text-foreground"
            >
              {data?.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Chez RunWood, chaque meuble est créé à partir de palettes
              recyclées, poncé, assemblé et fini à la main. Une approche
              artisanale, durable et authentique qui donne une seconde vie au
              bois tout en créant des pièces uniques pour votre intérieur.
            </p>

            {/* Values Grid */}
            <ul className="grid gap-6 pt-4">
              {data?.features?.map((value) => (
                <li key={value.title} className="flex gap-4 items-start group">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/60 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <DynamicIcon name={value.icon as IconName} size={24} />
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
