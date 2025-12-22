import { Button } from '@/components/ui/Button';
import { STUDY_ROLE, type StudyRole } from '@/types/studyRole';
import { CodeXmlIcon, PlusIcon } from 'lucide-react';

type Props = {
  studyId: number;
  role: StudyRole;
};

export const DailyAssignmentsTableHeader = ({ studyId, role }: Props) => {
  const isEditable = role === STUDY_ROLE.OWNER;

  console.log(studyId);

  return (
    <div className="flex flex-row items-center justify-between gap-3">
      <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap">
        <CodeXmlIcon className="size-3.5" />
        <span>오늘의 추천 문제</span>
      </div>
      <div className="flex gap-2">
        {isEditable && (
          <Button variant="secondary" size="sm">
            <PlusIcon />
            <span className="hidden sm:inline">문제 직접 추가</span>
          </Button>
        )}
      </div>
    </div>
  );
};
