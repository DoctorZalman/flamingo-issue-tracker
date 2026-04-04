interface SkeletonProps {
  className?: string;
}

function SkeletonBlock({ className = "" }: SkeletonProps) {
  return <div className={`animate-pulse rounded bg-gray-200 dark:bg-gray-700 ${className}`} />;
}

export function IssueListSkeleton() {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
        >
          <div className="flex flex-col gap-2 flex-1">
            <SkeletonBlock className="h-4 w-2/3" />
            <SkeletonBlock className="h-3 w-1/4" />
          </div>
          <div className="flex items-center gap-3">
            <SkeletonBlock className="h-5 w-16" />
            <SkeletonBlock className="h-7 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function IssueDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <SkeletonBlock className="h-8 w-3/4" />
      <SkeletonBlock className="h-4 w-1/4" />
      <div className="flex flex-col gap-3">
        <SkeletonBlock className="h-10 w-full" />
        <SkeletonBlock className="h-28 w-full" />
        <div className="flex gap-4">
          <SkeletonBlock className="h-10 flex-1" />
          <SkeletonBlock className="h-10 flex-1" />
        </div>
      </div>
    </div>
  );
}
