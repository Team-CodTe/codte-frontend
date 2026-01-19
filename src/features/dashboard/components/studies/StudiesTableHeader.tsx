import { Button } from '@/components/ui/Button';
import { PATH } from '@/constants/path';
import {
  GitPullRequestArrowIcon,
  NotebookPenIcon,
  PlusIcon,
} from 'lucide-react';
import Link from 'next/link';

export const StudiesTableHeader = () => {
  return (
    <div className="flex min-h-8 w-full flex-row items-center justify-between gap-3">
      <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap">
        <NotebookPenIcon className="size-3.5" />
        <span>내 스터디</span>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" size="icon-sm-responsive" asChild>
          <Link
            id="study-create-link"
            aria-label="스터디 생성 페이지로 이동"
            href={PATH.STUDY.CREATE}
            className="cursor-default">
            <PlusIcon />
            <span className="hidden sm:inline">생성</span>
          </Link>
        </Button>
        <Button variant="secondary" size="icon-sm-responsive" asChild>
          <Link
            id="study-join-link"
            aria-label="스터디 참여 페이지로 이동"
            href={PATH.STUDY.JOIN}
            className="cursor-default">
            <GitPullRequestArrowIcon />
            <span className="hidden sm:inline">가입</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
