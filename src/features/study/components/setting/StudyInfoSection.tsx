import { type GetStudyDetailResponse } from '@/api/study/getStudyDetail/type';
import { Separator } from '@/components/ui/Separator';
import { formatDate } from '@/lib/formatDate';

import { InviteCodeSnippet } from './study-info/InviteCodeSnippet';
import { UpdateStudyForm } from './study-info/UpdateStudyForm';

type Props = {
  study: GetStudyDetailResponse;
};

export const StudyInfoSection = ({ study }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-end justify-between">
          <h2 className="text-xl font-bold">스터디 정보</h2>
          <div className="text-muted-foreground text-xs">
            생성일: {formatDate(study.createdAt, { includeTime: false })}
          </div>
        </div>
        <Separator />
      </div>

      <div className="flex flex-col gap-6">
        <InviteCodeSnippet inviteCode={study.inviteCode} />
        <UpdateStudyForm
          studyId={study.id}
          initialData={study}
          role={study.myRole}
        />
      </div>
    </div>
  );
};
