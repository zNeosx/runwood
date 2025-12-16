// app/actions/download-ebook.ts
'use server';

import { supabaseAdmin } from '@/lib/supabase/server';
import { EBOOK_FILES, Language } from '@/lib/stripe/config';

export async function getEbookDownloadUrl(language: Language) {
  try {
    const fileName = EBOOK_FILES[language];

    // ✅ Génère un signed URL valide 1 heure (au lieu de télécharger le fichier)
    // Évite les problèmes de timeout et de limite de payload (4MB)
    const { data, error } = await supabaseAdmin.storage
      .from('ebooks')
      .createSignedUrl(fileName, 3600, {
        download: true,
      }); // 1 heure

    if (error || !data?.signedUrl) {
      console.error('Supabase error:', error);
      return {
        error: 'Erreur lors de la génération du lien de téléchargement',
      };
    }

    return {
      success: true,
      downloadUrl: data.signedUrl,
    };
  } catch (error) {
    console.error('Error generating download URL:', error);
    return {
      success: false,
      error: 'Une erreur est survenue',
    };
  }
}
