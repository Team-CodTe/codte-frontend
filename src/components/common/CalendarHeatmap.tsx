import { Skeleton } from '@/components/ui/Skeleton';
import dynamic from 'next/dynamic';

export const DynamicCalendarHeatmap = dynamic(
  () => import('react-calendar-heatmap'),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[113px] w-full rounded-md" />,
  },
);
