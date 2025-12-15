import { type GetStudyDetailResponse } from '@/api/study/getStudyDetail/type';
import { Separator } from '@/components/ui/Separator';

import { StudyExitButton } from './danger-zone/StudyExitButton';

type Props = {
  study: GetStudyDetailResponse;
};

export const DangerZoneSection = ({ study }: Props) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">중요 설정</h2>
        <Separator />
      </div>

      <StudyExitButton id={study.id} role={study.myRole} />
    </div>
  );
};
