import { Skeleton } from '@/components/ui/Skeleton';

import { LEGEND_ITEMS, RANGE_DAYS } from '../../constants/heatmap';

export const StatisticsFallback = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="border-border flex w-full flex-col gap-2 rounded-md border p-4">
        <Skeleton className="h-[113px] w-full rounded-md" />

        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-muted-foreground order-2 text-end text-xs sm:order-1 sm:text-left">
            최근 {RANGE_DAYS}일 동안 풀었던 문제의 수가 표시됩니다.
          </span>
          <div className="text-muted-foreground order-1 flex items-center justify-end gap-3 text-xs sm:order-2">
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

      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="border-border flex w-full flex-col gap-1 rounded-md border p-4">
          <span className="text-xs font-medium">전체 추천 문제 수</span>
          <div className="flex items-end justify-end">
            <Skeleton className="h-7.5 w-16" />
          </div>
        </div>
        <div className="border-border flex w-full flex-col gap-1 rounded-md border p-4">
          <span className="text-xs font-medium">푼 문제 수</span>
          <div className="flex items-end justify-end gap-2">
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-7.5 w-16" />
          </div>
        </div>
        <div className="border-border flex w-full flex-col gap-1 rounded-md border p-4">
          <span className="text-xs font-medium">작성한 풀이 글 수</span>
          <div className="flex items-end justify-end gap-2">
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-7.5 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};
