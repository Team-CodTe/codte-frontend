import { Skeleton } from '@/components/ui/Skeleton';

import { LEGEND_ITEMS } from '../../constants/heatmap';

export const StatisticsFallback = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="border-border flex w-full flex-col gap-4 rounded-md border p-4">
        <Skeleton className="h-[113px] w-full min-w-[723px] rounded-md" />

        <div className="flex w-full items-center justify-between">
          <span className="text-muted-foreground text-xs">
            풀었던 문제의 수가 표시됩니다.
          </span>
          <div className="text-muted-foreground flex items-center gap-3 text-xs">
            {LEGEND_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-1.5 whitespace-nowrap">
                <div
                  className="h-3 w-3 rounded-[2px]"
                  style={{ background: item.color }}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
