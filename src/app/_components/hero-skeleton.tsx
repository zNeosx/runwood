const HeroSkeleton = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background Skeleton */}
      <div className="absolute inset-0 z-0 bg-muted/20 animate-pulse" />

      {/* Content Skeleton */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title Skeleton */}
          <div className="space-y-4">
            <div className="h-16 bg-muted rounded-lg w-3/4 mx-auto animate-pulse" />
            <div className="h-16 bg-muted rounded-lg w-2/3 mx-auto animate-pulse" />
          </div>

          {/* Description Skeleton */}
          <div className="space-y-3 max-w-2xl mx-auto pt-4">
            <div className="h-6 bg-muted/80 rounded w-full animate-pulse" />
            <div className="h-6 bg-muted/80 rounded w-5/6 mx-auto animate-pulse" />
          </div>

          {/* Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <div className="h-14 w-56 bg-muted rounded-lg animate-pulse" />
            <div className="h-14 w-64 bg-muted rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
