import { HintTooltip } from '@/components/common/HintTooltip';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { formatDate } from '@/lib/formatFunc';
import { STUDY_ROLE, type StudyRole } from '@/types/studyRole';
import { InfoIcon } from 'lucide-react';

type Props = {
  refreshedAt: string;
  isRefreshing: boolean;
  onRefresh: () => void;
  role: StudyRole;
};

export const DailyAssignmentsTableFooter = ({
  refreshedAt,
  isRefreshing,
  onRefresh,
  role,
}: Props) => {
  const isOwner = role === STUDY_ROLE.OWNER;

  return (
    <div className="text-muted-foreground flex flex-row items-center justify-between gap-3 px-2 text-xs">
      <span>{formatDate(refreshedAt)} 기준</span>

      <div className="flex items-center gap-1">
        <HintTooltip content="스터디장만 30분에 한 번씩 할 수 있어요. 새로운 추천 문제를 강제로 갱신할 때 사용해요.">
          <InfoIcon className="size-3" />
        </HintTooltip>
        <Button
          variant="link"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing || !isOwner}
          className="text-muted-foreground hover:text-foreground h-4 p-0 text-xs">
          {isRefreshing ? <Spinner className="size-3" /> : null}
          {isRefreshing ? '갱신 중...' : '추천 문제 강제 갱신'}
        </Button>
      </div>
    </div>
  );
};
