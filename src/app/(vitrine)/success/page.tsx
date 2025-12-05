import DownloadEbookBtn from '@/components/download-ebook-btn';
import ConfettiLottie from '@/components/lottie/confetti.lottie';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { stripe } from '@/lib/stripe';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

type SearchParams = Promise<{ session_id?: string }>;

export default async function Success({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const { status, line_items, amount_total, currency } =
    await stripe.checkout.sessions.retrieve(session_id as string, {
      expand: ['line_items', 'line_items.data.price.product', 'payment_intent'],
    });

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    // return (
    //   <section id="success">
    //     <Lottie animationData={confettiLottieAnimation} loop={true} />
    //     <p>
    //       We appreciate your business! A confirmation email will be sent to{' '}
    //       {customer_details?.email}. If you have any questions, please
    //       email{' '}
    //     </p>
    //     <a href="mailto:orders@example.com">orders@example.com</a>.
    //   </section>
    // );
    const lineItem = line_items?.data[0];
    const product = lineItem?.price?.product as Stripe.Product;
    return (
      <section id="success" className="min-h-screen h-screen flex flex-col">
        <div className="grow flex flex-col items-center justify-center">
          <div className="p-6">
            <div className="size-24 mx-auto">
              <ConfettiLottie />
            </div>
            <div className="text-center space-y-4 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Merci pour votre achat !
              </h1>
              <p className="text-md text-muted-foreground max-w-xl mx-auto">
                Votre paiement a été effectué avec succès. Vous allez recevoir
                un email avec le lien de téléchargement de votre e-book.
              </p>
            </div>
            <Card className="p-6 mt-6">
              <CardHeader>
                <CardTitle className="text-3xl font-semibold">
                  Récapitulatif
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between">
                  <span className="text-muted-foreground">Produit</span>
                  <span className="text-foreground">{product.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format</span>
                  <span className="text-foreground">PDF (E-Book)</span>
                </div>
                <div className="flex justify-between border-t border-border/50 pt-3">
                  <span className="text-muted-foreground">Total payé</span>
                  <span className="text-foreground font-semibold">
                    {(amount_total! / 100).toFixed(2)} {currency?.toUpperCase()}
                  </span>
                </div>
              </CardContent>
            </Card>
            <div className="flex items-center justify-center gap-4 mt-6">
              <DownloadEbookBtn />
              <Link
                href="/"
                className={buttonVariants({
                  variant: 'outline',
                  size: 'lg',
                })}
              >
                <Home className="mr-2 h-5 w-5" />
                Retour à l&apos;accueil
              </Link>
            </div>
            <p className="mt-8 text-sm text-muted-foreground text-center">
              Un problème ? Contactez-nous à{' '}
              <a
                href="mailto:support@runwood.fr"
                className="text-accent hover:underline"
              >
                support@runwood.fr
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  }
}
