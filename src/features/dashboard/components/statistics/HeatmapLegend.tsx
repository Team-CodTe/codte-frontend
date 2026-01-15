import { LEGEND_ITEMS, RANGE_DAYS } from '../../constants/heatmap';

export const HeatmapLegend = () => {
  return (
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
              className="h-3 w-3 rounded-xs"
              style={{ background: item.color }}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
