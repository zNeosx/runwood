import { defineField, defineType } from 'sanity';
import { Image } from 'lucide-react';

export default defineType({
  name: 'gallery',
  title: 'Galerie',
  type: 'document',
  icon: Image,
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
      rows: 2,
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Légende',
              type: 'string',
            }),
          ],
        },
      ],
      options: { layout: 'grid' },
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Galerie' }),
  },
});
