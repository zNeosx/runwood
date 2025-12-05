'use client';
import Image from 'next/image';
import { Masonry } from 'react-plock';

type MasonryGridItem = {
  id: string;
  title?: string;
  description?: string;
  src: string;
};
type Props = {
  items: MasonryGridItem[];
  containerClassName?: string;
};

export const MasonryGrid = (props: Props) => {
  return (
    <div className="relative pb-10">
      <Masonry
        items={props.items}
        config={{
          columns: [1, 2, 3],
          gap: [24, 12, 18],
          media: [640, 768, 1024],
        }}
        render={(item) => (
          <img
            key={item.id}
            src={item.src}
            alt={item.description ?? 'image'}
            className="object-cover rounded-lg w-full h-auto"
          />
        )}
      />
    </div>
  );
};
