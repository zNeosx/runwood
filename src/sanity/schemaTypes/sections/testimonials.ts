import { defineField, defineType } from 'sanity';
import { Users } from 'lucide-react';

export default defineType({
  name: 'testimonials',
  title: 'Témoignages',
  type: 'document',
  icon: Users,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Témoignages',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'testimonial',
          fields: [
            defineField({
              name: 'name',
              title: 'Nom',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Rôle / Entreprise',
              type: 'string',
            }),
            defineField({
              name: 'quote',
              title: 'Témoignage',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'avatar',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'rating',
              title: 'Note (1-5)',
              type: 'number',
              options: { list: [1, 2, 3, 4, 5] },
              initialValue: 5,
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'quote',
              media: 'avatar',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Témoignages' }),
  },
});
