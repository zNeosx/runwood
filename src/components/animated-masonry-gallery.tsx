'use client';

import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import { motion } from 'motion/react';
import Image from 'next/image';
import { ALL_PHOTOS_QUERYResult } from '../../sanity.types';
import { Marquee } from './ui/marquee';

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        'bg-primary/20 p-1 py-0.5 font-bold text-primary dark:bg-primary/20 dark:text-primary',
        className
      )}
    >
      {children}
    </span>
  );
};

export interface MasonryGalleryCardProps {
  item: ALL_PHOTOS_QUERYResult[0];
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const MasonryGalleryCard = ({
  item,
  className,
  ...props
}: MasonryGalleryCardProps) => (
  <div
    className={cn(
      'relative mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-2xl p-4 h-96',
      className
    )}
    {...props} // Spread the rest of the props here
  >
    {item.image && (
      <Image
        fill
        src={urlFor(item.image).width(1200).url()}
        alt={item.name ?? 'Photo'}
        className="size-full object-cover rounded-xl"
      />
    )}
  </div>
);

export default function AnimatedMasonryGallery({
  items,
}: {
  items: ALL_PHOTOS_QUERYResult;
}) {
  return (
    <div className="relative mt-6 max-h-screen overflow-hidden max-w-7xl mx-auto mb-6">
      <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
        {Array(Math.ceil(items.length / 3))
          .fill(0)
          .map((_, i) => (
            <Marquee
              vertical
              key={i}
              className={cn({
                '[--duration:60s]': i === 1,
                '[--duration:30s]': i === 2,
                '[--duration:70s]': i === 3,
              })}
            >
              {items.slice(i * 3, (i + 1) * 3).map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: Math.random() * 0.8,
                    duration: 1.2,
                  }}
                >
                  <MasonryGalleryCard item={item} />
                </motion.div>
              ))}
            </Marquee>
          ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-linear-to-t from-background from-20%"></div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-linear-to-b from-background from-20%"></div>
    </div>
  );
}
