import { Select, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { ListCheckIcon } from 'lucide-react';

export const SolveStatusTableHeader = () => {
  return (
    <div className="flex min-h-8 flex-row items-center justify-between gap-3">
      <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap">
        <ListCheckIcon className="size-3.5" />
        <span>문제 풀이 상태</span>
      </div>

      <div className="flex gap-2">
        <Select>
          <SelectTrigger size="sm">
            <SelectValue placeholder="전체 보기" />
          </SelectTrigger>
        </Select>
      </div>
    </div>
  );
};
