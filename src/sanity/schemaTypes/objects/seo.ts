import { defineField, defineType } from 'sanity';
import { Sparkles } from 'lucide-react';

export const seo = defineType({
  name: 'seo',
  title: 'Optimisation SEO',
  type: 'object',
  icon: Sparkles,
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Titre SEO (Meta Title)',
      type: 'string',
      description:
        "Max. 60 caractères. Apparaît dans l'onglet du navigateur et les résultats de recherche.",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Description SEO (Meta Description)',
      type: 'text',
      rows: 4,
      description:
        'Max. 160 caractères. Apparaît sous le titre dans les résultats de recherche.',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Image de Partage (Open Graph Image)',
      type: 'image',
      description:
        'Image utilisée lorsque cette page est partagée sur les réseaux sociaux (Facebook, Twitter, LinkedIn). Recommandé : 1200x630px.',
      options: {
        hotspot: true,
      },
    }),
  ],
});
