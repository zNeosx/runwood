import { BuyButton } from '@/components/buy-button';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSettings } from '@/sanity/queries';
import { ArrowLeft, Home, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Language } from '@/lib/stripe/config';

export const revalidate = 3600; // 1 heure

const CancelCheckoutPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) => {
  const settings = await getSettings();
  const params = await searchParams;
  const language = (params.lang as Language) || 'FRA';

  return (
    <section id="cancel" className="min-h-screen h-screen flex flex-col">
      <div className="grow flex flex-col items-center justify-center">
        <div className="p-6">
          <div className="mb-6 animate-scale-in">
            <div className="w-24 h-24 mx-auto rounded-full bg-destructive/20 flex items-center justify-center">
              <XCircle className="w-12 h-12 text-destructive" />
            </div>
          </div>
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Paiement annulé
            </h1>
            <p className="text-md text-muted-foreground max-w-xl mx-auto">
              Votre paiement a été annulé. Aucun montant n&apos;a été débité de
              votre compte.
            </p>
          </div>
          <Card className=" mt-6">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold">
                Pourquoi revenir ?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-highlight">•</span>
                  Plus de 60 pages de contenu exclusif
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-highlight">•</span>
                  10+ projets détaillés avec plans
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-highlight">•</span>
                  Accès à vie
                </li>
              </ul>
            </CardContent>
          </Card>
          <div className="flex items-center justify-center gap-3 mt-6">
            <BuyButton language={language}>
              <ArrowLeft className="h-5 w-5" />
              Revenir à l&apos;achat
            </BuyButton>

            <Link
              href="/"
              className={buttonVariants({
                variant: 'outline',
                className: 'hover:bg-primary',
              })}
            >
              <Home className="mr-2 h-5 w-5" />
              Retour à l&apos;accueil
            </Link>
          </div>
          <p className="mt-8 text-sm text-foreground text-center">
            Un problème ? Contactez-nous à{' '}
            <a
              href="mailto:support@runwood.fr"
              className="text-muted-foreground hover:underline hover:text-primary"
            >
              {settings.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CancelCheckoutPage;
