import { STUDY_ROLE, type StudyRole } from '@/types/studyRole';
import { CodeXmlIcon } from 'lucide-react';

import { AssignmentAddDialog } from './AssignmentAddDialog';

type Props = {
  studyId: number;
  role: StudyRole;
};

export const DailyAssignmentsTableHeader = ({ studyId, role }: Props) => {
  const isEditable = role === STUDY_ROLE.OWNER;

  return (
    <div className="flex flex-row items-center justify-between gap-3">
      <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap">
        <CodeXmlIcon className="size-3.5" />
        <span>오늘의 추천 문제</span>
      </div>
      <div className="flex gap-2">
        {isEditable && <AssignmentAddDialog studyId={studyId} />}
      </div>
    </div>
  );
};
