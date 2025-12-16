import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const features = [
  {
    label: 'Plans détaillés et mesures précises',
  },
  {
    label: "Techniques d'assemblage professionnel",
  },
  {
    label: 'Conseils de finition et protection du bois',
  },
  {
    label: 'Astuces pour personnaliser vos créations',
  },
];
const Video = () => {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid gap-12">
          <div className="aspect-video bg-red-300">VIDEO</div>

          <div className="space-y-6">
            <Badge variant={'highlight'} size={'lg'}>
              Formation DIY
            </Badge>
            <h2 className="text-4xl font-bold">
              Apprenez à Fabriquer vos Meubles
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Des vidéos pas-à-pas pour réaliser vous-même des meubles en
              palette, du plan à la finition. Techniques professionnelles
              expliquées simplement.
            </p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex gap-4">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <span>{feature.label}</span>
                </li>
              ))}
            </ul>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href={'/videos'}
                className={cn('max-md:w-full', buttonVariants())}
              >
                Accéder aux Vidéos
              </Link>
              <Link
                href={'#'}
                className={cn(
                  'max-md:w-full',
                  buttonVariants({
                    variant: 'outline',
                  })
                )}
              >
                Formations Premium
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Video;
