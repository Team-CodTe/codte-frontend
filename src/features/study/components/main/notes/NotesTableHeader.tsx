'use client';

import { Button } from '@/components/ui/Button';
import { PATH } from '@/constants/path';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { STUDY_ROLE, type StudyRole } from '@/types/studyRole';
import { FileCog2Icon, LibraryIcon, Maximize2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  studyId: number;
  role: StudyRole;
};

export const NotesTableHeader = ({ studyId, role }: Props) => {
  const router = useRouter();

  const isEditable = role === STUDY_ROLE.OWNER;

  const moveToManageTemplate = () => {
    router.push(
      buildUrlWithParams({
        url: PATH.STUDY.NOTE.TEMPLATE,
        pathParams: { studyId },
      }),
    );
  };

  const moveToMaximize = () => {
    router.push(
      buildUrlWithParams({
        url: PATH.STUDY.NOTE.LIST,
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
        {isEditable && (
          <Button
            variant="secondary"
            size="icon-sm-responsive"
            onClick={moveToManageTemplate}>
            <FileCog2Icon />
            <span className="hidden sm:inline">템플릿 관리</span>
          </Button>
        )}

        <Button
          variant="secondary"
          size="icon-sm-responsive"
          onClick={moveToMaximize}>
          <Maximize2Icon />
          <span className="hidden sm:inline">전체 페이지로 보기</span>
        </Button>
      </div>
    </div>
  );
};
