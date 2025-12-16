// sanity/lib/signature.ts (Adapté de la documentation)

import { NextRequest } from 'next/server';
// 💡 La fonction 'isValidSignature' est directement disponible dans le package @sanity/webhook
import { isValidSignature } from '@sanity/webhook';

const SANITY_WEBHOOK_SECRET = process.env.SANITY_REVALIDATE_SECRET;

/**
 * Vérifie si la requête entrante provient bien de Sanity en utilisant la signature HMAC.
 * @param request - La requête NextRequest
 * @param body - Le corps de la requête sous forme de texte brut (stringifiedPayload)
 * @returns boolean
 */
export async function isValidSignatureNext(
  request: NextRequest,
  body: string
): Promise<boolean> {
  if (!SANITY_WEBHOOK_SECRET) {
    console.error("SANITY_REVALIDATE_SECRET n'est pas défini.");
    return false;
  }

  // 1. Récupérer l'en-tête de signature.
  // La documentation indique que le nom de l'en-tête est 'sanity-webhook-signature'.
  // Cependant, par défaut, Next.js et Sanity utilisent souvent 'x-sanity-signature'.
  // Testez avec 'x-sanity-signature' d'abord, ou utilisez la constante:
  // const signature = request.headers.get(SIGNATURE_HEADER_NAME); // si vous importez la constante

  const signature = request.headers.get('sanity-webhook-signature'); // 👈 Le plus courant en pratique
  if (!signature) {
    console.error('Missing X-Sanity-Signature header');
    return false;
  }

  try {
    // 2. Utiliser la fonction du package pour vérifier la signature
    const isValid = await isValidSignature(
      body, // stringifiedPayload
      signature, // signature
      SANITY_WEBHOOK_SECRET // secret
    );
    return isValid;
  } catch (error) {
    // Si la fonction échoue (format invalide, etc. - voir WebhookSignatureFormatError)
    console.error('Error during signature verification:', error);
    return false;
  }
}
