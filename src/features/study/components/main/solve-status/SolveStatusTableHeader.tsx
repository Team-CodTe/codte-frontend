'use client';

import { useTransition } from 'react';

import {
  VIEW_METHOD,
  type ViewMethod,
} from '@/api/solve-status/getSolveStatus/type';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { SOLVE_STATUS_VIEW_PARSER } from '@/features/study/constants/searchParams';
import { ChevronDownIcon, ListCheckIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';

const VIEW_LABELS: Record<ViewMethod, string> = {
  [VIEW_METHOD.GROUP]: '스터디 풀이 상태',
  [VIEW_METHOD.ME]: '내 풀이 상태',
};

export const SolveStatusTableHeader = () => {
  const router = useRouter();
  const [_, startTransition] = useTransition();
  const [view, setView] = useQueryState('view', SOLVE_STATUS_VIEW_PARSER);

  const currentView = view ?? VIEW_METHOD.GROUP;

  const handleViewChange = (value: ViewMethod) => {
    startTransition(async () => {
      await setView(value);
      router.refresh();
    });
  };

  return (
    <div className="flex min-h-8 flex-row items-center justify-between gap-3">
      <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap">
        <ListCheckIcon className="size-3.5" />
        <span>문제 풀이 상태</span>
      </div>

      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm" className="gap-2">
              <ChevronDownIcon />
              <span>{VIEW_LABELS[currentView]}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              value={currentView}
              onValueChange={(value) => handleViewChange(value as ViewMethod)}>
              <DropdownMenuRadioItem value={VIEW_METHOD.GROUP}>
                스터디 풀이 상태
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={VIEW_METHOD.ME}>
                내 풀이 상태
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
