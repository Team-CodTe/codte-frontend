import { type GetStudyDetailResponse } from '@/api/study/getStudyDetail/type';
import { Separator } from '@/components/ui/Separator';
import { STUDY_ROLE } from '@/types/studyRole';

import { StudyLeaveRow } from './danger-zone/StudyLeaveRow';
import { StudyRemoveRow } from './danger-zone/StudyRemoveRow';

type Props = {
  study: GetStudyDetailResponse;
};

export const DangerZoneSection = ({ study }: Props) => {
  const isMember = study.myRole === STUDY_ROLE.MEMBER;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">중요 설정</h2>
        <Separator />
      </div>

      {isMember ? <StudyLeaveRow /> : <StudyRemoveRow studyName={study.name} />}
    </div>
  );
};
