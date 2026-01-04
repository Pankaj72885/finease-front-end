/**
 * Skeleton Loader Components for loading states
 */

export const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-muted rounded-lg ${className}`}
    aria-hidden="true"
  />
);

export const TransactionCardSkeleton = () => (
  <div className="card-base p-5">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div>
          <Skeleton className="h-5 w-24 mb-2" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <Skeleton className="h-7 w-20" />
    </div>
    <Skeleton className="h-4 w-32 mb-3" />
    <Skeleton className="h-12 w-full rounded-lg mb-4" />
    <div className="flex justify-between pt-3 border-t border-border">
      <div className="flex gap-2">
        <Skeleton className="h-8 w-16 rounded-lg" />
        <Skeleton className="h-8 w-16 rounded-lg" />
      </div>
      <Skeleton className="h-8 w-8 rounded-lg" />
    </div>
  </div>
);

export const SummaryCardSkeleton = () => (
  <div className="rounded-2xl bg-muted/50 p-6 border border-border">
    <Skeleton className="w-12 h-12 rounded-xl mb-4" />
    <Skeleton className="h-4 w-24 mb-2" />
    <Skeleton className="h-8 w-32 mb-2" />
    <Skeleton className="h-5 w-16 rounded-full" />
  </div>
);

export const ChartSkeleton = () => (
  <div className="h-64 flex items-end justify-around gap-2 pt-8">
    {[...Array(12)].map((_, i) => (
      <Skeleton
        key={i}
        className="w-8 rounded-t-lg"
        style={{ height: `${Math.random() * 60 + 20}%` }}
      />
    ))}
  </div>
);

export const ProfileSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <Skeleton className="w-24 h-24 rounded-2xl" />
      <div>
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-56" />
      </div>
    </div>
    <div className="space-y-4">
      <Skeleton className="h-12 w-full rounded-xl" />
      <Skeleton className="h-12 w-full rounded-xl" />
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  </div>
);

export const TableRowSkeleton = ({ columns = 5 }) => (
  <div className="flex items-center gap-4 p-4 border-b border-border">
    {[...Array(columns)].map((_, i) => (
      <Skeleton key={i} className="h-4 flex-1" />
    ))}
  </div>
);
