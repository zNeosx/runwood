import { defineField, defineType } from 'sanity';
import { Info } from 'lucide-react';

export default defineType({
  name: 'about',
  title: 'À propos',
  type: 'document',
  icon: Info,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'features',
      title: 'Avantages Clés',
      type: 'array',
      description: 'Définissez ici les 3 arguments de vente principaux.',
      of: [
        {
          type: 'object',
          name: 'featureItem',
          title: 'Avantage',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icône/Symbole',
              type: 'lucide-icon',
              options: {
                outputFormat: 'react',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: "Titre de l'avantage",
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description détaillée',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'À propos' }),
  },
});
