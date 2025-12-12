'use client';

import { useMemo, useState } from 'react';
import { ALL_PHOTOS_QUERYResult, GalleryCategory } from '../../sanity.types';
import { FocusCards } from './ui/focus-cards';

interface GalleryContentProps {
  items: ALL_PHOTOS_QUERYResult;
  categories: GalleryCategory[];
}

export default function GalleryContent({
  items,
  categories,
}: GalleryContentProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = useMemo(() => {
    return selectedCategory === 'all'
      ? items
      : items.filter((item) => item.category?._id === selectedCategory);
  }, [items, selectedCategory]);

  return (
    <>
      {/* Filters */}
      <nav
        aria-label="Filtrer par catégorie"
        className="py-8 bg-background border-b border-border"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              aria-pressed={selectedCategory === 'all'}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              Tous
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                aria-pressed={selectedCategory === category._id}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category._id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Gallery Grid */}
      <section aria-label="Créations" className="py-16 bg-background">
        <FocusCards cards={filteredItems} />
      </section>
    </>
  );
}
