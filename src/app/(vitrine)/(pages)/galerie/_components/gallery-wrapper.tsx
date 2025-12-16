import GalleryContent from '@/components/gallery-content';
import { getCategories } from '@/sanity/queries/category';
import { getAllPhotos } from '@/sanity/queries/gallery';
import React from 'react';

const GalleryWrapper = async () => {
  const categories = await getCategories();

  const galleryItems = await getAllPhotos();

  await new Promise((r) => setTimeout(r, 3000));

  return <GalleryContent items={galleryItems} categories={categories} />;
};

export default GalleryWrapper;
