import { Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Marie Dubois',
      location: 'Lyon',
      text: "Une table magnifique qui apporte une vraie chaleur à mon salon. Le travail est impeccable, on sent la passion de l'artisan.",
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    },
    {
      id: 2,
      name: 'Thomas Martin',
      location: 'Paris',
      text: "J'ai commandé un salon de jardin complet. Livraison rapide et qualité exceptionnelle. Tout le monde me demande où je l'ai acheté !",
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      location: 'Marseille',
      text: "Les vidéos DIY sont parfaites ! J'ai pu réaliser ma première étagère grâce aux explications claires. Merci RunWood !",
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <Badge variant={'accent'} size="lg" className="mb-4">
            Témoignages
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ils Nous Font Confiance
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez ce que nos clients pensent de nos créations
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="p-6 hover-lift bg-card border-border"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-highlight text-highlight"
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                  width={48}
                  height={48}
                />
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
