import { type GetStudyDetailResponse } from '@/api/study/getStudyDetail/type';
import { Separator } from '@/components/ui/Separator';
import { formatDate } from '@/lib/formatDate';

import { InviteCodeRow } from './study-info/InviteCodeRow';
import { UpdateStudyForm } from './study-info/UpdateStudyForm';

type Props = {
  study: GetStudyDetailResponse;
};

export const StudyInfoSection = ({ study }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-end justify-between">
          <h2 className="text-2xl font-bold">스터디 정보</h2>
          <div className="text-muted-foreground text-sm">
            생성일: {formatDate(study.createdAt, { includeTime: false })}
          </div>
        </div>
        <Separator />
      </div>

      <div className="flex flex-col gap-6">
        <InviteCodeRow inviteCode={study.inviteCode} />
        <UpdateStudyForm
          key={JSON.stringify(study)}
          initialData={study}
          role={study.myRole}
        />
      </div>
    </div>
  );
};
