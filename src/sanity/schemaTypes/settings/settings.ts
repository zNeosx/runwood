import { defineField, defineType } from 'sanity';

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email de contact',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
    }),
    defineField({
      name: 'tiktok',
      title: 'Tiktok',
      type: 'url',
    }),
  ],
});
