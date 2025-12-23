import { HintTooltip } from '@/components/common/HintTooltip';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { formatDate } from '@/lib/formatDate';
import { InfoIcon } from 'lucide-react';

type Props = {
  refreshedAt: string;
  isRefreshing: boolean;
  onRefresh: () => void;
};

export const DailyAssignmentsTableFooter = ({
  refreshedAt,
  isRefreshing,
  onRefresh,
}: Props) => {
  return (
    <div className="text-muted-foreground flex flex-col items-end justify-end gap-1 text-xs">
      <span>{formatDate(refreshedAt)} 기준</span>
      <div className="flex items-center gap-1">
        <HintTooltip content="30분에 한 번씩 할 수 있어요.">
          <InfoIcon className="size-3" />
        </HintTooltip>
        <Button
          variant="link"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="text-muted-foreground hover:text-foreground h-4 p-0 text-xs">
          {isRefreshing ? <Spinner className="size-3" /> : null}
          {isRefreshing ? '갱신 중...' : '추천 문제 강제 갱신'}
        </Button>
      </div>
    </div>
  );
};
