import { Button } from '@/components/ui/Button';
import { CheckIcon, UserRoundCogIcon } from 'lucide-react';

import { TableLabel } from '../../TableLabel';

export const MemberTableHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-3">
      <TableLabel
        icon={CheckIcon}
        label="스터디 문제 풀이 상태"
        tooltipContent="스터디원들의 문제 풀이 현황과 풀이 글 작성 현황을 한 눈에 볼 수 있어요."
      />
      {/** @todo 스터디 회장만 보이도록 변경 */}
      <Button variant="secondary" size="sm">
        <UserRoundCogIcon />
        <span className="hidden sm:inline">스터디원 관리</span>
      </Button>
    </div>
  );
};
