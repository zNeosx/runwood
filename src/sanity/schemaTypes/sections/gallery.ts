// src/sanity/schemaTypes/gallerySection.ts
import { defineField, defineType } from 'sanity';
import { Image } from 'lucide-react';

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Section Galerie',
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
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'maxPhotos',
      title: 'Nombre max de photos à afficher',
      type: 'number',
      initialValue: 6,
      validation: (Rule) => Rule.min(1).max(25),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Section Galerie' }),
  },
});
