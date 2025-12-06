import { groq } from 'next-sanity';
import { sanityFetch } from '../lib/fetch';
import type { Settings } from '../../../sanity.types';

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

const SETTINGS_QUERY = groq`*[_type == "settings"][0]{
  email,
  phone,
  address,
  instagram,
  tiktok
}`;

export async function getSettings(): Promise<Settings> {
  try {
    const settings = await sanityFetch<Settings | null>({
      query: SETTINGS_QUERY,
      tags: ['settings'],
    });

    return settings ?? DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Erreur Sanity (settings):', error);
    return DEFAULT_SETTINGS;
  }
}
