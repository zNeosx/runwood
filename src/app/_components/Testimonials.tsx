import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Marquee } from '@/components/ui/marquee';

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: 'Sarah Chen',
      designation: 'Product Manager at TechFlow',
      src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: 'Michael Rodriguez',
      designation: 'CTO at InnovateSphere',
      src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: 'Emily Watson',
      designation: 'Operations Director at CloudScale',
      src: 'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: 'James Kim',
      designation: 'Engineering Lead at DataPro',
      src: 'https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      quote:
        'The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.',
      name: 'Lisa Thompson',
      designation: 'VP of Technology at FutureNet',
      src: 'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <Badge variant={'highlight'} size="lg" className="mb-4">
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
        {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
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
        </div> */}
        {/* <AnimatedTestimonials
          testimonials={testimonials}
          autoplay
          className="py-10"
        /> */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:80s]">
            {testimonials.map((t, index) => (
              <Card key={index} className="max-w-md">
                <CardHeader>
                  <CardTitle className="text-foreground font-bold">
                    {t.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{t.quote}</p>
                </CardContent>
              </Card>
            ))}
          </Marquee>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
