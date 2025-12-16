import { getGallerySection } from '@/sanity/queries/homepage';
import Gallery from './Gallery';

const GalleryWrapper = async () => {
  const data = await getGallerySection();

  return <Gallery data={data} />;
};

export default GalleryWrapper;
