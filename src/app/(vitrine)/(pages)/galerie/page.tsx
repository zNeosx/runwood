import { DynamicBreadcrumb } from '@/components/dynamic-breadcrumb';
import GalleryContent from '@/components/gallery-content';
import { getCategories } from '@/sanity/queries/category';
import { getAllPhotos } from '@/sanity/queries/gallery';

const Galerie = async () => {
  const categories = await getCategories();

  const galleryItems = await getAllPhotos();

  return (
    <>
      {/* Header */}
      <header className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Galerie de Créations
            </h1>
            <p className="text-xl text-muted-foreground">
              Découvrez toutes nos réalisations en bois de palette recyclé.
              Chaque pièce est unique et peut être personnalisée selon vos
              envies.
            </p>
            <DynamicBreadcrumb className="justify-center py-4" />
          </div>
        </div>
      </header>
      <GalleryContent items={galleryItems} categories={categories} />
    </>
  );
};

export default Galerie;
