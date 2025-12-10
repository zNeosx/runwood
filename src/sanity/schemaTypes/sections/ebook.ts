import { defineField, defineType } from 'sanity';
import { BookOpen } from 'lucide-react';

export const ebookSection = defineType({
  name: 'ebookSection',
  title: 'Ebook',
  type: 'document',
  icon: BookOpen,
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
      rows: 3,
    }),
    defineField({
      name: 'cover',
      title: 'Couverture',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ctaText',
      title: 'Texte du bouton',
      type: 'string',
      initialValue: 'Télécharger',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Lien du bouton',
      type: 'url',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Ebook' }),
  },
});
