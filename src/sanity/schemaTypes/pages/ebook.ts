import { defineField, defineType } from 'sanity';
import { BookOpen, DollarSign, ListChecks } from 'lucide-react'; // Ajout d'icônes pour la clarté dans le Studio

export const ebook = defineType({
  name: 'ebookPage',
  title: 'Page du Ebook',
  type: 'document',
  icon: BookOpen,
  fields: [
    // --- 1. Titres et Texte d'Introduction (Partie supérieure) ---

    defineField({
      name: 'pageTitle', // Renommé pour éviter la confusion avec ebookTitle
      title: 'Titre Principal (Haut de page)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageSubtitle',
      title: 'Sous-titre (Description générale)',
      type: 'text',
      rows: 3,
      description: "Ex: Maîtrisez l'art de la transformation de palettes...",
    }),

    // --- 2. Bloc de Contenu/Couverture ---

    defineField({
      name: 'ebookTitle',
      title: 'Titre du Ebook (sur la couverture)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Accroche/Sous-titre du bloc de vente',
      type: 'string',
      description:
        "Ex: Tout ce qu'il faut savoir pour créer vos propres meubles en palette",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Image de couverture du Ebook',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    // --- 3. Caractéristiques / Avantages (Les points à cocher) ---

    defineField({
      name: 'features',
      title: 'Liste des caractéristiques/avantages',
      type: 'array',
      icon: ListChecks,
      of: [
        {
          type: 'object',
          name: 'featureItem',
          title: 'Caractéristique',
          fields: [
            defineField({
              name: 'text',
              title: 'Description',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'text',
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.min(1).error('Vous devez spécifier au moins un avantage.'),
    }),

    // --- 4. SEO (Optionnel mais recommandé) ---

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo', // Assumant que vous avez un type d'objet réutilisable 'seo'
    }),
  ],
});
