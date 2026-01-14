import { Skeleton } from '@/components/ui/Skeleton';
import { ChevronRightIcon } from 'lucide-react';

export const StudySapceHeaderFallback = () => {
  return (
    <header className="bg-background sticky top-0 z-50 flex h-16 w-full items-center justify-between gap-4 px-5 lg:px-8">
      <div className="flex flex-1 items-center gap-1.5 sm:gap-2.5">
        <Skeleton className="h-8 w-12" />
        <ChevronRightIcon className="text-accent size-3.5" />
        <Skeleton className="h-5 w-32" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </header>
  );
};
