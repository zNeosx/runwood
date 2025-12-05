import { DynamicBreadcrumb } from '@/components/dynamic-breadcrumb';
import ContactForm from '@/components/forms/contact.form';
import { Card } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@runwood.fr',
      link: 'mailto:contact@runwood.fr',
    },
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+33 6 12 34 56 78',
      link: 'tel:+33612345678',
    },
    {
      icon: MapPin,
      title: 'Adresse',
      value: 'Paris, France',
      link: '#',
    },
  ];

  return (
    <>
      {/* Header de page */}
      <header className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
              Contactez-Nous
            </h1>
            <p className="text-xl text-muted-foreground">
              Une question ? Un projet sur mesure ? N&apos;hésitez pas à nous
              contacter, nous vous répondrons dans les plus brefs délais.
            </p>
            <DynamicBreadcrumb className="justify-center py-4" />
          </div>
        </div>
      </header>

      <section
        className="py-16 bg-background"
        aria-labelledby="contact-heading"
      >
        <h2 id="contact-heading" className="sr-only">
          Formulaire et coordonnées
        </h2>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Info */}
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">
                  Informations de contact
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Nous sommes à votre disposition pour répondre à toutes vos
                  questions et vous accompagner dans vos projets.
                </p>
              </div>

              <address className="not-italic space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.title}
                    href={info.link}
                    className="flex items-start gap-4 p-6 rounded-xl bg-muted hover:bg-muted/80 transition-colors group"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-highlight/10 flex items-center justify-center group-hover:bg-highlight/20 transition-colors">
                      <info.icon className="w-6 h-6 text-highlight" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary mb-1">
                        {info.title}
                      </p>
                      <p className="text-muted-foreground">{info.value}</p>
                    </div>
                  </a>
                ))}
              </address>

              <Card className="p-6 bg-linear-to-br from-accent/10 to-highlight/10 border-accent/20">
                <h3 className="font-semibold text-lg text-primary mb-2">
                  Horaires d&apos;ouverture
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Lundi - Vendredi : 9h - 18h</p>
                  <p>Samedi : 10h - 16h</p>
                  <p>Dimanche : Fermé</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
