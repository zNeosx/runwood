'use client';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const GallerySkeleton = () => {
  return (
    <div className="py-8 border-b border-border w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-center flex-wrap gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <Skeleton key={index} className="h-10 w-24 rounded-full" />
          ))}
        </div>

        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto md:px-8 w-full py-10">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
              <Skeleton
                key={index}
                className={
                  'rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-120 w-full transition-all duration-300 ease-out'
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySkeleton;
