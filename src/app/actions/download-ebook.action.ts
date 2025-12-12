// app/actions/download-ebook.ts
'use server';

import { supabaseAdmin } from '@/lib/supabase/server';
import { EBOOK_FILES, Language } from '@/lib/stripe/config';

export async function downloadEbook(language: Language) {
  try {
    const fileName = EBOOK_FILES[language];

    // Télécharger le fichier depuis Supabase avec supabaseAdmin
    const { data, error } = await supabaseAdmin.storage
      .from('ebooks')
      .download(fileName);

    if (error) {
      console.error('Download error:', error);
      return {
        error: "Erreur lors du téléchargement de l'e-book",
      };
    }

    // Convertir le blob en base64 pour le transférer au client
    const arrayBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');

    return {
      success: true,
      data: base64,
      fileName,
      mimeType: data.type,
    };
  } catch (error) {
    console.error('Error downloading ebook:', error);
    return {
      success: false,
      error: 'Une erreur est survenue lors du téléchargement',
    };
  }
}
