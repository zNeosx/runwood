import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const AboutSkeleton = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <Skeleton className="size-[712px] rounded-full" />
          <div className="space-y-6">
            <Skeleton className="h-9 w-20 rounded-full" />
            <Skeleton className="h-12 w-[400px]" />
            <Skeleton className="h-40 w-full" />
            <div className="flex flex-col gap-4">
              <Skeleton className="h-14 w-[450px] rounded-lg" />
              <Skeleton className="h-14 w-[450px] rounded-lg" />
              <Skeleton className="h-14 w-[450px] rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSkeleton;
