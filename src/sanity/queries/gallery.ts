// src/sanity/queries/gallery.ts
import { groq } from 'next-sanity';
import { sanityFetch } from '../lib/live';
import {
  ALL_PHOTOS_QUERYResult,
  Gallery,
  GallerySection,
} from '../../../sanity.types';

// Pour la section homepage (photos featured)
const GALLERY_SECTION_QUERY = groq`{
  "section": *[_type == "gallerySection"][0]{ title, subtitle, maxPhotos },
  "photos": *[_type == "gallery" && featured == true] | order(order asc) {
    _id,
    name,
    description,
    image,
    "category": category->{ name, slug }
  }
}`;

export async function getGallerySection(): Promise<{
  section: GallerySection;
  photos: Gallery[];
}> {
  const { data } = await sanityFetch({
    query: GALLERY_SECTION_QUERY,
    tags: ['gallerySection', 'gallery'],
  });

  // Limite au maxPhotos défini
  const maxPhotos = data.section?.maxPhotos || 6;
  return {
    ...data.section,
    photos: data.photos.slice(0, maxPhotos),
  };
}

// Pour la page galerie complète
const ALL_PHOTOS_QUERY = groq`*[_type == "gallery"] | order(order asc) {
  _id,
  name,
  description,
  image,
  "category": category->{ _id, name, slug }
}`;

export async function getAllPhotos(): Promise<ALL_PHOTOS_QUERYResult> {
  const { data } = await sanityFetch({
    query: ALL_PHOTOS_QUERY,
    tags: ['gallery'],
  });
  return data;
}
