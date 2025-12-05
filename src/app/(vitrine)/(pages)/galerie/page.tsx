'use client';
import Navigation from '@/components/Navigation';
import { useState } from 'react';
import Image from 'next/image';
import Footer from '@/app/_components/Footer';
import { Badge } from '@/components/ui/badge';

const Galerie = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

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

  const filteredItems =
    selectedCategory === 'Tous'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Header */}
        <section className="py-16">
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
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
              {filteredItems.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-medium hover-lift">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      fill
                    />
                  </div>
                  <div className="space-y-2">
                    {/* <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                      {item.category}
                    </span> */}
                    <Badge variant={'primaryLight'}>{item.category}</Badge>
                    <h3 className="text-xl font-bold group-hover:text-highlight transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Galerie;
