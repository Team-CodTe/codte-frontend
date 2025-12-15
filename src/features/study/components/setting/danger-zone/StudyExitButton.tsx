import { Label } from '@/components/ui/Label';
import { STUDY_ROLE, type StudyRole } from '@/types/studyRole';

import { StudyLeaveDialog } from './StudyLeaveDialog';
import { StudyRemoveDialog } from './StudyRemoveDialog';

type Props = {
  id: number;
  studyName: string;
  role: StudyRole;
};

export const StudyExitButton = ({ id, studyName, role }: Props) => {
  const isMember = role === STUDY_ROLE.MEMBER;

  return (
    <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <Label htmlFor="deleteStudy">스터디 {isMember ? '탈퇴' : '삭제'}</Label>
        <span className="text-muted-foreground text-sm leading-normal">
          {isMember
            ? '스터디를 탈퇴해도 다시 들어올 수 있습니다.'
            : '스터디를 삭제하면 다시 복구할 수 없습니다.'}
        </span>
      </div>
      {isMember ? (
        <StudyLeaveDialog id={id} />
      ) : (
        <StudyRemoveDialog id={id} studyName={studyName} />
      )}
    </div>
  );
};
