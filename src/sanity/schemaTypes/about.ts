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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare: () => ({ title: 'À propos' }),
  },
});
