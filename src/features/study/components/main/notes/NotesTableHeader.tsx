import { Button } from '@/components/ui/Button';
import { PATH } from '@/constants/path';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { STUDY_ROLE, type StudyRole } from '@/types/studyRole';
import { BookOpenCheckIcon, FileCog2Icon, Maximize2Icon } from 'lucide-react';
import Link from 'next/link';

type Props = {
  studyId: number;
  role: StudyRole;
};

export const NotesTableHeader = ({ studyId, role }: Props) => {
  const isEditable = role === STUDY_ROLE.OWNER;

  const manageTemplatePageUrl = buildUrlWithParams({
    url: PATH.STUDY.NOTES.TEMPLATE,
    pathParams: { studyId },
  });

  const maximizeNotesPageUrl = buildUrlWithParams({
    url: PATH.STUDY.NOTES.LIST,
    pathParams: { studyId },
  });

  return (
    <div className="flex min-h-8 flex-row items-center justify-between gap-3">
      <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap">
        <BookOpenCheckIcon className="size-3.5" />
        <span>문제 풀이 글</span>
      </div>
      <div className="flex gap-2">
        {isEditable && (
          <Button variant="secondary" size="icon-sm-responsive" asChild>
            <Link
              id="manage-template-link"
              aria-label="템플릿 관리 페이지로 이동"
              href={manageTemplatePageUrl}
              className="cursor-default">
              <FileCog2Icon />
              <span className="hidden sm:inline">템플릿 관리</span>
            </Link>
          </Button>
        )}

        <Button variant="secondary" size="icon-sm-responsive" asChild>
          <Link
            id="maximize-notes-link"
            aria-label="전체 문제 풀이 글 페이지로 이동"
            href={maximizeNotesPageUrl}
            className="cursor-default">
            <Maximize2Icon />
            <span className="hidden sm:inline">전체 페이지 보기</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
