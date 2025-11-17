export function PromptCardSkeleton() {
  return (
    <div className="relative rounded-[25px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-white">
      {/* Image skeleton */}
      <div className="relative aspect-[10/11] w-full bg-slate-200 animate-pulse">
        {/* Title capsule skeleton - Top Left */}
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-slate-300 h-7 w-32 rounded-full animate-pulse" />
        </div>

        {/* Like count skeleton - Top Right */}
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-slate-300 h-7 w-16 rounded-full animate-pulse" />
        </div>

        {/* Bottom gradient area skeleton */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-300/80 via-slate-300/40 to-transparent pt-20 pb-4 px-4">
          {/* Description lines skeleton */}
          <div className="space-y-2 mb-3">
            <div className="bg-slate-400 h-3 w-full rounded animate-pulse" />
            <div className="bg-slate-400 h-3 w-5/6 rounded animate-pulse" />
            <div className="bg-slate-400 h-3 w-4/6 rounded animate-pulse" />
          </div>

          {/* Bottom row skeleton */}
          <div className="flex items-center justify-between gap-2">
            <div className="bg-slate-400 h-3 w-20 rounded animate-pulse" />
            <div className="bg-slate-400 h-8 w-20 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface GridSkeletonProps {
  count?: number;
}

export function GridSkeleton({ count = 12 }: GridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <PromptCardSkeleton key={index} />
      ))}
    </div>
  );
}
