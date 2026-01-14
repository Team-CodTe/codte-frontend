import { ListCheckIcon } from 'lucide-react';

import { StatusViewDropdownButton } from './StatusViewDropdownButton';

export const SolveStatusTableHeader = () => {
  return (
    <div className="flex min-h-8 flex-row items-center justify-between gap-3">
      <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap">
        <ListCheckIcon className="size-3.5" />
        <span>문제 풀이 상태</span>
      </div>

      <div className="flex gap-2">
        <StatusViewDropdownButton />
      </div>
    </div>
  );
};
