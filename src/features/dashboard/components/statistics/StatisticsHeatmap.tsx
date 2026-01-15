'use client';

import type { ReactElement } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { formatDate } from '@/lib/formatFunc';
import { parseISO } from 'date-fns';

import { DynamicCalendarHeatmap } from '../../../../components/common/CalendarHeatmap';
import {
  LEGEND_ITEMS,
  MONTH_LABELS,
  RANGE_DAYS,
  WEEKDAY_LABELS,
} from '../../constants/heatmap';

type HeatmapValue = {
  date: Date;
  count: number;
};

type Props = {
  startDate: Date;
  endDate: Date;
  values: HeatmapValue[];
};

const getHeatmapClass = (count: number) => {
  if (count === 0) return 'heatmap-color-0';

  if (count === 1) return 'heatmap-color-1';

  if (count <= 3) return 'heatmap-color-2';

  if (count <= 5) return 'heatmap-color-3';

  return 'heatmap-color-4';
};

const getTooltipContent = (value?: {
  date: Date | string | number;
  count?: number;
}) => {
  if (!value) {
    return '데이터 없음';
  }

  const date =
    value.date instanceof Date
      ? value.date
      : typeof value.date === 'string'
        ? parseISO(value.date)
        : new Date(value.date);
  const count = typeof value.count === 'number' ? value.count : 0;

  return `${formatDate(date, { includeTime: false })} · ${count}문제`;
};

export const StatisticsHeatmap = ({ startDate, endDate, values }: Props) => {
  return (
    <div className="border-border flex w-full flex-col gap-2 rounded-md border p-4">
      <div className="w-full overflow-x-auto overflow-y-hidden">
        <div className="heatmap-wrapper h-[113px] min-w-[723px]">
          <DynamicCalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={values}
            showWeekdayLabels={true}
            weekdayLabels={WEEKDAY_LABELS}
            monthLabels={MONTH_LABELS}
            classForValue={(value) => {
              if (!value || !value.count) {
                return 'heatmap-color-0';
              }

              return getHeatmapClass(value.count);
            }}
            transformDayElement={(element, value, index) => {
              return (
                <Tooltip key={index} disableHoverableContent>
                  <TooltipTrigger asChild>
                    {element as ReactElement}
                  </TooltipTrigger>
                  <TooltipContent side="top" className="pointer-events-none">
                    {getTooltipContent(value)}
                  </TooltipContent>
                </Tooltip>
              );
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
  );
};
