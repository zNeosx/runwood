import GalleryContent from '@/components/gallery-content';
import { getCategories } from '@/sanity/queries/category';
import { getAllPhotos } from '@/sanity/queries/gallery';
import React from 'react';

const GalleryWrapper = async () => {
  const [categories, galleryItems] = await Promise.all([
    getCategories(),
    getAllPhotos(),
  ]);
  return <GalleryContent items={galleryItems} categories={categories} />;
};

export default GalleryWrapper;
