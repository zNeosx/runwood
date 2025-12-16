// app/api/webhooks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { Resend } from 'resend';
import { EBOOK_FILES, Language } from '@/lib/stripe/config';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase/server';
import { EMAIL_CONFIG } from '@/lib/config/email';
import { Redis } from '@upstash/redis';

const resend = new Resend(process.env.RESEND_API_KEY);
const redis = Redis.fromEnv();

const LANGUAGE_LABELS: Record<Language, string> = {
  FRA: 'Français',
  ANG: 'Anglais',
  ESP: 'Espagnol',
  PRT: 'Portugais',
};

export const maxDuration = 10; // Pour être explicite sur la limite Hobby

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    console.error('❌ Signature invalide');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // ✅ Vérifier l'idempotence avec Redis pour éviter les doubles traitements
  const eventKey = `stripe-event:${event.id}`;
  const alreadyProcessed = await redis.get(eventKey);

  if (alreadyProcessed) {
    console.log(`⏩ Event ${event.id} déjà traité (idempotence)`);
    return NextResponse.json({ received: true, cached: true });
  }

  await redis.setex(eventKey, 300, 'processing');

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email?.trim().toLowerCase();
    const language = (session.metadata?.language as Language) || 'FRA';

    if (!customerEmail) {
      console.error('❌ Email client manquant');
      return NextResponse.json({ error: 'No email' }, { status: 400 });
    }

    console.log(`📧 Traitement commande pour ${customerEmail} (${language})`);

    try {
      // Récupère le nom du fichier
    const fileName = EBOOK_FILES[language];

    // Génère le signed URL
    const { data, error } = await supabaseAdmin.storage
      .from('ebooks')
      .createSignedUrl(fileName, 60 * 60 * 24 * 7); // 7 jours

    if (error || !data?.signedUrl) {
      console.error('❌ Erreur Supabase:', error);
      return NextResponse.json({ error: 'Storage error' }, { status: 500 });
    }

    const cleanEmail = customerEmail.trim().toLowerCase();

    // Envoie l'email
    const { error: emailError } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: cleanEmail,
      subject: 'Votre e-book est prêt ! 📚',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1a1a1a;">Merci pour votre achat !</h1>

          <p style="color: #666; font-size: 16px;">
            Votre e-book <strong>"Fais-le Toi-Même"</strong> en ${LANGUAGE_LABELS[language]} est prêt à être téléchargé.
          </p>

          <div style="margin: 30px 0;">
            <a href="${data.signedUrl}" style="
              display: inline-block;
              background: #55833d;
              color: white;
              padding: 14px 28px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
            ">
              Télécharger mon e-book
            </a>
          </div>

          <p style="color: #999; font-size: 14px;">
            Ce lien expire dans 7 jours. Conservez bien votre fichier après téléchargement.
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

          <p style="color: #999; font-size: 12px;">
            Un problème ? Contactez-nous à ${EMAIL_CONFIG.supportEmail}
          </p>
        </div>
      `,
    });

    if (emailError) {
      console.error('❌ Erreur Resend:', emailError);
      return NextResponse.json({ error: 'Email error' }, { status: 500 });
    }

    console.log(`✅ Email envoyé à ${customerEmail}`);

    // ✅ Marquer l'event comme traité (expire après 7 jours)
    await redis.setex(eventKey, 60 * 60 * 24 * 7, 'processed');
    } catch (error) {
      console.error('❌ Erreur de traitement final:', error);
      await redis.setex(eventKey, 60 * 60 * 24, 'failed'); // TTL de 24h pour examen
      return NextResponse.json({ error: 'Internal processing error' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
