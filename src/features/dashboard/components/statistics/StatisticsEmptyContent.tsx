'use client';

import 'react-calendar-heatmap/dist/styles.css';

import { startOfDay, subDays } from 'date-fns';
import { ChartColumnIncreasingIcon } from 'lucide-react';

import { DynamicCalendarHeatmap } from '../../../../components/common/CalendarHeatmap';
import {
  LEGEND_ITEMS,
  MONTH_LABELS,
  RANGE_DAYS,
  WEEKDAY_LABELS,
} from '../../constants/heatmap';
import { StatisticsCard } from './StatisticsCard';

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

      <div className="relative flex w-full flex-col gap-2">
        <div className="bg-background/50 absolute inset-0 z-10 flex flex-col items-center justify-center rounded-md p-10 backdrop-blur-xs">
          <span className="text-foreground text-center text-sm font-medium">
            스터디장이나 멤버가 되어 CodTe와 함께 코딩 테스트 기록을
            시작해보세요!
          </span>
        </div>

        <div className="border-border flex w-full flex-col gap-2 rounded-md border p-4">
          <div className="w-full overflow-x-auto overflow-y-hidden">
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
          <StatisticsCard label="전체 추천 문제 수" value={2026} />
          <StatisticsCard label="푼 문제 수" value={2000} subValue="98.7%" />
          <StatisticsCard
            label="작성한 풀이 글 수"
            value={1999}
            subValue="98.6%"
          />
        </div>
      </div>
    </div>
  );
};
