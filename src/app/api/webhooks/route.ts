// app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  // 1. Vérifie que l'event vient de Stripe
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log('event', event);
  } catch {
    console.error('Signature invalide');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // 2. Paiement réussi ?
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email;
    console.log('customerEmail', customerEmail);

    if (customerEmail) {
      // 3. Génère un lien sécurisé (expire dans 7 jours)
      const { data, error } = await supabaseAdmin.storage
        .from('ebooks')
        .createSignedUrl('ebook-fr.pdf', 60 * 60 * 24 * 7);

      if (error) {
        console.error('Erreur Supabase:', error);
        return NextResponse.json({ error: 'Storage error' }, { status: 500 });
      }

      const cleanEmail = customerEmail.trim().toLowerCase();
      console.log('cleanEmail:', cleanEmail);

      // 4. Envoie l'email
      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: cleanEmail,
        subject: 'Votre e-book est prêt ! 📚',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Merci pour votre achat !</h1>
            <p>Votre e-book est disponible au téléchargement.</p>
            <a href="${data.signedUrl}" style="
              display: inline-block;
              background: #7C3AED;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 8px;
              margin: 20px 0;
            ">
              Télécharger mon e-book
            </a>
            <p style="color: #666; font-size: 14px;">
              Ce lien expire dans 7 jours. En cas de problème, contactez-nous.
            </p>
          </div>
        `,
      });

      console.log(`✅ Email envoyé à ${customerEmail}`);
    }
  }

  return NextResponse.json({ received: true });
}
