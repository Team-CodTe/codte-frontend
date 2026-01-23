import { HintTooltip } from '@/components/common/HintTooltip';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { formatDate } from '@/lib/formatFunc';
import { InfoIcon } from 'lucide-react';

type Props = {
  lastUpdatedAt: string;
  isRefreshing: boolean;
  onRefresh: () => void;
};

export const SolveStatusTableFooter = ({
  lastUpdatedAt,
  isRefreshing,
  onRefresh,
}: Props) => {
  return (
    <div className="text-muted-foreground flex flex-row items-center justify-between gap-3 px-2 text-xs">
      <span>{formatDate(lastUpdatedAt)} 기준</span>

      <div className="flex items-center gap-1">
        <HintTooltip content="누구나 5분에 한 번씩 할 수 있습니다. 본인의 풀이 상태를 업데이트할 때 사용합니다.">
          <InfoIcon className="size-3" />
        </HintTooltip>
        <Button
          variant="link"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="text-muted-foreground hover:text-foreground h-4 p-0 text-xs">
          {isRefreshing ? <Spinner className="size-3" /> : null}
          {isRefreshing ? '업데이트 중...' : '풀이 상태 업데이트'}
        </Button>
      </div>
    </div>
  );
};
