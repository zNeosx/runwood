import { DynamicBreadcrumb } from '@/components/dynamic-breadcrumb';
import GalleryWrapper from './_components/gallery-wrapper';
import { Suspense } from 'react';
import GallerySkeleton from '@/app/_components/gallery-skeleton';

export const revalidate = 3600; // 1 heure

const Galerie = async () => {
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
      <Suspense fallback={<GallerySkeleton />}>
        <GalleryWrapper />
      </Suspense>
    </>
  );
};

export default Galerie;
