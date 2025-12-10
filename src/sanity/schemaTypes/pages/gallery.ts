import { defineField, defineType } from 'sanity';
import { Images } from 'lucide-react';

export const galleryPage = defineType({
  name: 'galleryPage',
  title: 'Page Galerie (Paramètres)',
  type: 'document',
  icon: Images,
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Titre de la page',
      type: 'string',
      initialValue: 'Galerie',
    }),
    defineField({
      name: 'pageDescription',
      title: 'Description (sous le titre)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
});
