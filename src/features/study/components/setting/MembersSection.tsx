import { type GetStudyDetailResponse } from '@/api/study/getStudyDetail/type';
import { Separator } from '@/components/ui/Separator';

import { MembersSuspense } from '../../suspenses/members/MembersSuspense';

type Props = {
  study: GetStudyDetailResponse;
};

export const MembersSection = ({ study }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">스터디 멤버</h2>
        <Separator />
      </div>

      <MembersSuspense studyId={study.id} />
    </div>
  );
};
