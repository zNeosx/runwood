'use client';

import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useState } from 'react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

interface GalleryContentProps {
  items: GalleryItem[];
  categories: string[];
}

export default function GalleryContent({
  items,
  categories,
}: GalleryContentProps) {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredItems =
    selectedCategory === 'Tous'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <>
      {/* Filters */}
      <nav
        aria-label="Filtrer par catégorie"
        className="py-8 bg-background border-b border-border"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
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
      </nav>

      {/* Gallery Grid */}
      <section aria-label="Créations" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
            {filteredItems.map((item) => (
              <li key={item.id}>
                <article className="group cursor-pointer">
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
                    <h2 className="text-xl font-bold group-hover:text-highlight transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
