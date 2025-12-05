// lib/sanity/queries.ts

import { Settings } from '../../sanity.types';
import { client } from './lib/client';

const DEFAULT_SETTINGS: Settings = {
  _id: '',
  _type: 'settings',
  _createdAt: '',
  _updatedAt: '',
  _rev: '',
  email: 'runwood412@gmail.com',
  phone: '0692634154',
  address: 'Bras-Panon, La Réunion',
  instagram: 'https://www.instagram.com/runwood97412',
  tiktok: 'https://www.tiktok.com/@runwood97412',
};

export async function getSettings(): Promise<Settings> {
  try {
    const settings = await client.fetch(
      `*[_type == "settings"][0]{
        email,
        phone,
        address,
        instagram,
        tiktok
      }`,
      {},
      { next: { revalidate: 3600 } }
    );

    if (!settings) {
      return DEFAULT_SETTINGS;
    }

    return settings;
  } catch (error) {
    console.error('Erreur Sanity (settings):', error);
    return DEFAULT_SETTINGS;
  }
}
