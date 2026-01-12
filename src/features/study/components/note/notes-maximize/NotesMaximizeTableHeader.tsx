import { Button } from '@/components/ui/Button';
import { PATH } from '@/constants/path';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { STUDY_ROLE, type StudyRole } from '@/types/studyRole';
import { FileCog2Icon } from 'lucide-react';
import Link from 'next/link';

import { SelectAssignmentDropdownButton } from '../write/SelectAssignmentDropdownButton';

type Props = {
  studyId: number;
  role: StudyRole;
};

export const NotesMaximizeTableHeader = ({ studyId, role }: Props) => {
  const isEditable = role === STUDY_ROLE.OWNER;

  const templateManagePageUrl = buildUrlWithParams({
    url: PATH.STUDY.NOTE.TEMPLATE,
    pathParams: { studyId },
  });

  return (
    <div className="flex h-9 flex-row items-center justify-between gap-3">
      <div className="flex flex-row items-end gap-3">
        <h2 className="text-2xl font-bold">문제 풀이 글</h2>
      </div>

      <div className="flex gap-2">
        {isEditable && (
          <Button variant="secondary" size="icon-responsive" asChild>
            <Link
              id="manage-template-link"
              aria-label="템플릿 관리 페이지로 이동"
              href={templateManagePageUrl}>
              <FileCog2Icon />
              <span className="hidden sm:inline">템플릿 관리</span>
            </Link>
          </Button>
        )}

        <SelectAssignmentDropdownButton studyId={studyId} />
      </div>
    </div>
  );
};
