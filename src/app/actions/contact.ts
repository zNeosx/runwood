'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const { name, email, phone, message } = data;

    const { error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: 'zneos.dev@gmail.com',
      replyTo: email,
      subject: `Nouvelle demande de ${name}`,

      // Utilise le template Resend
      // Option 1 : Template ID
      // react: undefined,
      // templateId: 'ton_template_id',
      // data: { name, email, phone, message },

      // Option 2 : HTML direct (si pas de template)
      html: `
        <h2>Nouvelle demande de contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
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
