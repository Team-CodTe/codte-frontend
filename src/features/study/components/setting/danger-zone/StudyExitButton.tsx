import { Label } from '@/components/ui/Label';
import { STUDY_ROLE, type StudyRole } from '@/types/studyRole';

import { StudyLeaveDialog } from './StudyLeaveDialog';
import { StudyRemoveDialog } from './StudyRemoveDialog';

type Props = {
  id: number;
  role: StudyRole;
};

export const StudyExitButton = ({ id, role }: Props) => {
  const isMember = role === STUDY_ROLE.MEMBER;

  return (
    <div className="flex flex-row items-start justify-between gap-3 md:items-center">
      <div>
        <Label htmlFor="deleteStudy">스터디 {isMember ? '탈퇴' : '삭제'}</Label>
        <span className="text-muted-foreground text-sm leading-normal">
          {isMember
            ? '스터디를 탈퇴해도 다시 들어올 수 있습니다.'
            : '스터디를 삭제하면 다시 복구할 수 없습니다.'}
        </span>
      </div>
      {isMember ? <StudyLeaveDialog id={id} /> : <StudyRemoveDialog />}
    </div>
  );
};
