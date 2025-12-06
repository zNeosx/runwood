'use client';
import Image from 'next/image';
import { Masonry } from 'react-plock';

type MasonryGridItem = {
  id: string;
  title?: string;
  description?: string;
  src: string;
  width: number;
  height: number;
};
type Props = {
  items: MasonryGridItem[];
  containerClassName?: string;
};

export const MasonryGrid = (props: Props) => {
  return (
    <ul className="relative pb-10 list-none">
      <Masonry
        items={props.items}
        config={{
          columns: [1, 2, 3],
          gap: [24, 12, 18],
          media: [640, 768, 1024],
        }}
        render={(item) => (
          <li key={item.id}>
            <Image
              src={item.src}
              alt={
                item.description ??
                `Création RunWood - ${item.title ?? 'meuble en palette'}`
              }
              width={item.width}
              height={item.height}
              className="object-cover rounded-lg w-full h-auto"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </li>
        )}
      />
    </ul>
  );
};
