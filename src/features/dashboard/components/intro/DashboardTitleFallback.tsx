import { Skeleton } from '@/components/ui/Skeleton';

export const DashboardTitleFallback = () => {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton className="h-7 w-56" />
      <Skeleton className="h-5 w-64" />
    </div>
  );
};
