'use client';

import { useTransition } from 'react';

import {
  VIEW_METHOD,
  type ViewMethod,
} from '@/api/solve-status/getSolveStatus/type';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { SOLVE_STATUS_VIEW_PARSER } from '@/features/study/constants/searchParams';
import { UserIcon, UsersIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';

const VIEW_LABELS: Record<ViewMethod, string> = {
  [VIEW_METHOD.GROUP]: '스터디 풀이 상태',
  [VIEW_METHOD.ME]: '내 풀이 상태',
  [VIEW_METHOD.MEMBER]: '멤버 풀이 상태',
};

export const StatusViewSelect = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [view, setView] = useQueryState('view', SOLVE_STATUS_VIEW_PARSER);

  const currentView = view ?? VIEW_METHOD.GROUP;

  const handleViewChange = (value: ViewMethod) => {
    startTransition(async () => {
      await setView(value);
      router.refresh();
    });
  };

  return (
    <Select
      value={currentView}
      onValueChange={(value) => handleViewChange(value as ViewMethod)}
      disabled={isPending}>
      <SelectTrigger size="sm" variant="secondary">
        {currentView === VIEW_METHOD.GROUP ? (
          <UsersIcon className="text-foreground" />
        ) : (
          <UserIcon className="text-foreground" />
        )}
        <span className="hidden sm:flex">
          <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value={VIEW_METHOD.GROUP}>
          {VIEW_LABELS[VIEW_METHOD.GROUP]}
        </SelectItem>
        <SelectItem value={VIEW_METHOD.ME}>
          {VIEW_LABELS[VIEW_METHOD.ME]}
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
