import { HintTooltip } from '@/components/common/HintTooltip';
import { formatDate } from '@/lib/formatFunc';

export const DailyAssignmentTableFooter = () => {
  return (
    <div className="text-muted-foreground flex flex-col items-end justify-end gap-1 text-xs">
      {/** 여기서는 현재 시각을 보여주는 것이지만, 실제 대시보드에서는 업데이트된 시간을 보여줘야 함 */}
      <span className="text-right" suppressHydrationWarning>
        {formatDate(new Date(), { includeTime: false })} 00:00 기준
      </span>
      <HintTooltip content="새로운 스터디원이 들어와서 새로운 문제를 추천받아야 할 때 사용해요. 30분에 한 번만 강제 갱신할 수 있어요.">
        <button
          onClick={() => console.log('강제 갱신 버튼 클릭')}
          className="cursor-pointer underline-offset-4 hover:underline">
          추천 문제 강제 갱신
        </button>
      </HintTooltip>
    </div>
  );
};
