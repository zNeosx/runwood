'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './badge';
import Image from 'next/image';
import { ALL_PHOTOS_QUERYResult } from '../../../sanity.types';
import { urlFor } from '@/sanity/lib/image';

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: ALL_PHOTOS_QUERYResult[0];
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        'rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-120 w-full transition-all duration-300 ease-out',
        hovered !== null && hovered !== index && 'blur-sm scale-[0.98]'
      )}
    >
      {card.image && (
        <Image
          src={urlFor(card.image).width(1200).url()}
          alt={card.name!}
          fill
          className="object-cover absolute inset-0"
        />
      )}
      <div
        className={cn(
          'absolute inset-0 bg-black/50 flex flex-col justify-end gap-2 py-8 px-4 transition-opacity duration-300',
          hovered === index ? 'opacity-100' : 'opacity-0'
        )}
      >
        <Badge variant={'primaryLight'}>{card.category?.name}</Badge>
        <span className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-linear-to-b from-neutral-50 to-neutral-200">
          {card.name}
        </span>
      </div>
    </div>
  )
);

Card.displayName = 'Card';

export function FocusCards({ cards }: { cards: ALL_PHOTOS_QUERYResult }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto md:px-8 w-full py-10">
      {cards.map((card, index) => (
        <Card
          key={card._id}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
