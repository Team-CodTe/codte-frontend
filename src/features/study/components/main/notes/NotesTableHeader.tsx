'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PATH } from '@/constants/path';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { STUDY_ROLE, type StudyRole } from '@/types/studyRole';
import {
  CircleXIcon,
  FileCog2Icon,
  LibraryIcon,
  SquarePenIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  studyId: number;
  role: StudyRole;
};

export const NotesTableHeader = ({ studyId, role }: Props) => {
  const router = useRouter();

  const isEditable = role === STUDY_ROLE.OWNER;

  const onClickTemplate = () => {
    router.push(
      buildUrlWithParams({
        url: PATH.STUDY.NOTE.TEMPLATE,
        pathParams: { studyId },
      }),
    );
  };

  return (
    <div className="flex min-h-8 flex-row items-center justify-between gap-3">
      <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap">
        <LibraryIcon className="size-3.5" />
        <span>문제 풀이 글</span>
      </div>
      <div className="flex gap-2">
        <div className="relative w-full">
          <Input
            id="search"
            type="text"
            inputMode="search"
            placeholder="검색..."
            className="h-8 pr-8"
          />
          {false && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {}}
              className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 h-8 rounded-l-none hover:bg-transparent">
              <CircleXIcon />
              <span className="sr-only">검색어 초기화</span>
            </Button>
          )}
        </div>
        {isEditable && (
          <Button variant="secondary" size="sm" onClick={onClickTemplate}>
            <FileCog2Icon />
            <span className="hidden sm:inline">템플릿 관리</span>
          </Button>
        )}
        <Button variant="secondary" size="sm">
          <SquarePenIcon />
          <span className="hidden sm:inline">글 작성</span>
        </Button>
      </div>
    </div>
  );
};
