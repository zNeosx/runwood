// scripts/migrate-types.ts
import { createClient } from '@sanity/client';
import { config } from 'dotenv';

config({ path: '.env.local' });

const token = process.env.SANITY_ADMIN_TOKEN;

console.log('Token présent:', !!token);
console.log('Token début:', token?.slice(0, 10) + '...');

const client = createClient({
  projectId: 'x9wekkpe',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

// Mapping des anciens types vers les nouveaux
// newId: ID fixe pour les singletons, null pour les listes (génère un nouvel ID)
const TYPE_MIGRATIONS = [
  { from: 'hero', to: 'heroSection', newId: 'heroSection' },
  { from: 'about', to: 'aboutSection', newId: 'aboutSection' },
  {
    from: 'testimonials',
    to: 'testimonialsSection',
    newId: 'testimonialsSection',
  },
  { from: 'gallery', to: 'galleryPage', newId: null },
  { from: 'category', to: 'galleryCategory', newId: null },
];

async function migrateTypes() {
  for (const { from, to, newId } of TYPE_MIGRATIONS) {
    console.log(`\n🔄 Migration: ${from} → ${to}`);

    const oldDocs = await client.fetch(`*[_type == $type]`, { type: from });

    if (oldDocs.length === 0) {
      console.log(`   Aucun document trouvé pour "${from}"`);
      continue;
    }

    console.log(`   ${oldDocs.length} document(s) trouvé(s)`);

    for (const doc of oldDocs) {
      // Extrait les données sans les métadonnées Sanity
      const { _id, _type, _rev, _createdAt, _updatedAt, ...data } = doc;

      try {
        // 1. Crée un NOUVEAU document avec le nouveau type
        const newDoc = {
          ...data,
          _type: to,
          ...(newId ? { _id: newId } : {}),
        };

        const created = await client.create(newDoc);
        console.log(`   ✅ Créé: ${created._id} (type: ${to})`);

        // 2. Supprime l'ancien document
        await client.delete(_id);
        console.log(`   🗑️  Supprimé: ${_id}`);

        // 3. Supprime aussi le draft si existe
        const draftId = `drafts.${_id}`;
        try {
          await client.delete(draftId);
          console.log(`   🗑️  Supprimé draft: ${draftId}`);
        } catch {
          // Pas de draft, c'est OK
        }
      } catch (error: any) {
        console.error(`   ❌ Erreur pour ${_id}:`, error.message);
      }
    }
  }

  console.log('\n✨ Migration terminée!');
}

migrateTypes();
