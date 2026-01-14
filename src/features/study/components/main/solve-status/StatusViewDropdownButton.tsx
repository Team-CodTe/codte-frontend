'use client';

import { useState, useTransition } from 'react';

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
import { cn } from '@/lib/utils';
import { ChevronDownIcon, UserIcon, UsersIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';

const VIEW_LABELS: Record<ViewMethod, string> = {
  [VIEW_METHOD.GROUP]: '스터디 풀이 상태',
  [VIEW_METHOD.ME]: '내 풀이 상태',
  [VIEW_METHOD.MEMBER]: '멤버 풀이 상태',
};

export const StatusViewDropdownButton = () => {
  const router = useRouter();
  const [_, startTransition] = useTransition();
  const [view, setView] = useQueryState('view', SOLVE_STATUS_VIEW_PARSER);
  const [isOpen, setIsOpen] = useState(false);

  const currentView = view ?? VIEW_METHOD.GROUP;

  const handleViewChange = (value: ViewMethod) => {
    startTransition(async () => {
      await setView(value);
      router.refresh();
    });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="gap-2">
          <ChevronDownIcon
            className={cn(
              'transition-transform duration-200',
              isOpen && '-rotate-180',
            )}
          />
          {currentView === VIEW_METHOD.GROUP ? (
            <UsersIcon className="inline sm:hidden" />
          ) : (
            <UserIcon className="inline sm:hidden" />
          )}
          <span className="hidden sm:inline">{VIEW_LABELS[currentView]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={currentView}
          onValueChange={(value) => handleViewChange(value as ViewMethod)}>
          <DropdownMenuRadioItem value={VIEW_METHOD.GROUP}>
            {VIEW_LABELS[VIEW_METHOD.GROUP]}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={VIEW_METHOD.ME}>
            {VIEW_LABELS[VIEW_METHOD.ME]}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
