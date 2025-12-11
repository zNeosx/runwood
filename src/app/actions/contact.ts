'use server';

import { Resend } from 'resend';
import { contactRateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Fonction de sanitization simple pour éviter les injections
function sanitizeInput(input: string, maxLength: number = 1000): string {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ''); // Enlève les balises HTML basiques
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Rate limiting par IP
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'anonymous';

    const { success, limit, remaining, reset } = await contactRateLimit.limit(ip);

    if (!success) {
      return {
        success: false,
        error: `Trop de requêtes. Limite : ${limit} emails/heure. Réessayez dans ${Math.ceil((reset - Date.now()) / 1000 / 60)} minutes.`,
      };
    }

    const { name, email, phone, message } = data;

    // Validation des inputs
    if (!name || !email || !message) {
      return { success: false, error: 'Tous les champs obligatoires doivent être remplis' };
    }

    if (name.length > 100 || email.length > 200 || phone.length > 20 || message.length > 5000) {
      return { success: false, error: 'Un ou plusieurs champs dépassent la taille maximale autorisée' };
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Format d\'email invalide' };
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name, 100);
    const sanitizedEmail = sanitizeInput(email, 200);
    const sanitizedPhone = sanitizeInput(phone, 20);
    const sanitizedMessage = sanitizeInput(message, 5000);

    const { error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: 'zneos.dev@gmail.com',
      replyTo: sanitizedEmail,
      subject: `Nouvelle demande de ${sanitizedName}`,

      // Utilise le template Resend
      // Option 1 : Template ID
      // react: undefined,
      // templateId: 'ton_template_id',
      // data: { name, email, phone, message },

      // Option 2 : HTML direct (si pas de template) - avec inputs sanitisés
      html: `
        <h2>Nouvelle demande de contact</h2>
        <p><strong>Nom :</strong> ${sanitizedName}</p>
        <p><strong>Email :</strong> ${sanitizedEmail}</p>
        <p><strong>Téléphone :</strong> ${sanitizedPhone}</p>
        <p><strong>Message :</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return { success: false, error: "Erreur lors de l'envoi" };
    }

    return { success: true };
  } catch (error) {
    console.error('Erreur:', error);
    return { success: false, error: 'Erreur serveur' };
  }
}
