'use client';

import type { ReactElement } from 'react';

import { DynamicCalendarHeatmap } from '@/components/common/CalendarHeatmap';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { formatDate } from '@/lib/formatFunc';
import { parseISO } from 'date-fns';

import { MONTH_LABELS, WEEKDAY_LABELS } from '../../../constants/heatmap';
import { HeatmapLegend } from './HeatmapLegend';

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

      <HeatmapLegend />
    </div>
  );
};
