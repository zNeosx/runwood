import Footer from '@/app/_components/Footer';
import { DynamicBreadcrumb } from '@/components/dynamic-breadcrumb';
import GalleryContent from '@/components/gallery-content';

const Galerie = () => {
  const categories = [
    'Tous',
    'Extérieur',
    'Intérieur',
    'Tables',
    'Jardin',
    'Mobilier',
  ];

  const galleryItems = [
    {
      id: 1,
      title: "Salon d'extérieur",
      category: 'Extérieur',
      image: '/images/IMG-20251201-WA0005.jpg',
      description: 'Ensemble complet avec canapé et table basse',
    },
    {
      id: 2,
      title: 'Table basse géométrique',
      category: 'Tables',
      image: '/images/IMG-20251201-WA0016.jpg',
      description: 'Design moderne avec motif en chevron',
    },
    {
      id: 3,
      title: 'Jardinière à étages',
      category: 'Jardin',
      image: '/images/IMG-20251201-WA0009.jpg',
      description: '3 niveaux pour vos plantes',
    },
    {
      id: 4,
      title: 'Meuble TV rustique',
      category: 'Intérieur',
      image: '/images/IMG-20251201-WA0019.jpg',
      description: 'Style industriel avec rangements',
    },
    {
      id: 5,
      title: "Banc d'entrée",
      category: 'Mobilier',
      image: '/images/IMG-20251201-WA0021.jpg',
      description: 'Avec coffre de rangement intégré',
    },
    {
      id: 6,
      title: 'Lit de jardin',
      category: 'Extérieur',
      image:
        'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
      description: 'Daybed confortable pour terrasse',
    },
    {
      id: 7,
      title: 'Table de salle à manger',
      category: 'Tables',
      image:
        'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
      description: '6-8 personnes, finition naturelle',
    },
    {
      id: 8,
      title: 'Étagère murale',
      category: 'Intérieur',
      image:
        'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
      description: 'Design modulable et personnalisable',
    },
  ];

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
