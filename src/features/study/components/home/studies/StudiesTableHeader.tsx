'use client';

import { useTransition } from 'react';

import { Button } from '@/components/ui/Button';
import { PATH } from '@/constants/path';
import {
  GitPullRequestArrowIcon,
  NotebookPenIcon,
  PlusIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export const StudiesTableHeader = () => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();

  const onClickCreate = () => {
    startTransition(() => {
      router.push(PATH.STUDY.CREATE);
    });
  };

  const onClickJoin = () => {
    startTransition(() => {
      router.push(PATH.STUDY.JOIN);
    });
  };

  return (
    <div className="flex w-full flex-row items-center justify-between gap-3">
      <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap">
        <NotebookPenIcon className="size-3.5" />
        <span>내 스터디</span>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onClickCreate}
          disabled={isNavigating}>
          <PlusIcon />
          <span className="hidden sm:inline">새로 만들기</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onClickJoin}
          disabled={isNavigating}>
          <GitPullRequestArrowIcon />
          <span className="hidden sm:inline">들어가기</span>
        </Button>
      </div>
    </div>
  );
};
