import { Button } from '@/components/ui/Button';
import {
  GitPullRequestArrowIcon,
  NotebookPenIcon,
  PlusIcon,
} from 'lucide-react';

export const StudyListTableHeader = () => {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-3">
      <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap">
        <NotebookPenIcon className="size-3.5" />
        <span>내 스터디</span>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <PlusIcon />
          <span className="hidden sm:inline">새로 만들기</span>
        </Button>
        <Button variant="outline" size="sm">
          <GitPullRequestArrowIcon />
          <span className="hidden sm:inline">들어가기</span>
        </Button>
      </div>
    </div>
  );
};
