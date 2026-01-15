'use client';

import 'react-calendar-heatmap/dist/styles.css';

import { startOfDay, subDays } from 'date-fns';
import { ChartColumnIncreasingIcon } from 'lucide-react';

import { DynamicCalendarHeatmap } from '../../../../components/common/CalendarHeatmap';
import {
  MONTH_LABELS,
  RANGE_DAYS,
  WEEKDAY_LABELS,
} from '../../constants/heatmap';

export const StatisticsEmptyContent = () => {
  const today = startOfDay(new Date());
  const startDate = subDays(today, RANGE_DAYS);

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex min-h-8 w-full flex-row items-center justify-between gap-3">
        <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap">
          <ChartColumnIncreasingIcon className="size-3.5" />
          <span>문제 풀이 통계</span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3">
        <div className="border-border relative flex w-full rounded-md border p-4">
          <div className="bg-background/50 absolute inset-0 z-10 flex flex-col items-center justify-center rounded-md backdrop-blur-[2px]">
            <span className="text-foreground text-sm font-medium">
              CodTe와 함께 코딩 테스트 기록을 시작해보세요!
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <div className="heatmap-wrapper h-[113px] min-w-[723px]">
              <DynamicCalendarHeatmap
                startDate={startDate}
                endDate={today}
                values={[]}
                showWeekdayLabels={true}
                weekdayLabels={WEEKDAY_LABELS}
                monthLabels={MONTH_LABELS}
                classForValue={() => {
                  return 'heatmap-color-0';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
