import { defineField, defineType } from 'sanity';
import { Image } from 'lucide-react';

export default defineType({
  name: 'gallery',
  title: 'Page Galerie',
  type: 'document',
  icon: Image,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Nom',
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
      name: 'category',
      title: 'Catégorie',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: "Afficher en page d'accueil",
      type: 'boolean',
      initialValue: false,
      description:
        "Cochez pour afficher cette photo dans la section galerie de la page d'accueil",
    }),
    defineField({
      name: 'order',
      title: "Ordre d'affichage",
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.name',
      media: 'image',
      featured: 'featured',
    },
    prepare: ({ title, subtitle, media, featured }) => ({
      title: featured ? `⭐ ${title}` : title,
      subtitle,
      media,
    }),
  },
  orderings: [
    {
      title: 'Ordre manuel',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
