import { HintTooltip } from '@/components/common/HintTooltip';
import { Button } from '@/components/ui/Button';
import { CodeXmlIcon, KeyboardIcon, PlusIcon } from 'lucide-react';

import { TableLabel } from '../../TableLabel';

export const DailyAssignmentTableHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-3">
      <TableLabel
        icon={CodeXmlIcon}
        label="오늘의 추천 문제"
        tooltipContent="스터디원들의 백준 ID를 이용해서 쿼리에 맞는 문제를 매일 추천해줘요."
      />
      <div className="flex gap-2">
        <Button variant="secondary" size="sm">
          <PlusIcon />
          <span className="hidden sm:inline">문제 직접 추가</span>
        </Button>
        <HintTooltip content="문제 추천 쿼리를 변경할 때 사용해요. 변경된 쿼리는 다음날 자동으로 반영되거나 강제 갱신을 통해 반영할 수 있어요.">
          <Button variant="secondary" size="sm">
            <KeyboardIcon />
            <span className="hidden sm:inline">추천 쿼리 변경</span>
          </Button>
        </HintTooltip>
      </div>
    </div>
  );
};
