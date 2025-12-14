import { getStudyDetail } from '@/api/study/getStudyDetail/fetch';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Separator } from '@/components/ui/Separator';
import { UpdateStudyForm } from '@/features/study/components/setting/UpdateStudyForm';
import { formatDate } from '@/lib/formatDate';
import { STUDY_ROLE } from '@/types/studyRole';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const StudySettingPage = async ({ params }: Props) => {
  const { id } = await params;
  const study = await getStudyDetail(id);

  const isMember = study.myRole === STUDY_ROLE.MEMBER;

  return (
    <main className="min-h-0 w-full flex-1 overflow-y-auto">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-18 p-5 md:p-10 md:px-0">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-end justify-between">
              <h2 className="text-xl font-bold">스터디 정보</h2>
              <div className="text-muted-foreground text-xs">
                생성일: {formatDate(study.createdAt, { includeTime: false })}
              </div>
            </div>
            <Separator />
          </div>
          <UpdateStudyForm
            id={id}
            initialData={study}
            role={study.myRole}
            inviteCode={study.inviteCode}
          />
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">중요 설정</h2>
            <Separator />
          </div>

          <div className="flex flex-row items-start justify-between gap-3 md:items-center">
            {isMember ? (
              <>
                <div>
                  <Label htmlFor="leaveStudy">스터디 탈퇴</Label>
                  <span className="text-muted-foreground text-sm leading-normal font-normal">
                    스터디를 나가도 다시 들어올 수 있습니다.
                  </span>
                </div>
                <Button variant="destructive">스터디 나가기</Button>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="deleteStudy">스터디 삭제</Label>
                  <span className="text-muted-foreground text-sm leading-normal font-normal">
                    스터디를 삭제하면 다시 복구할 수 없습니다.
                  </span>
                </div>
                <Button variant="destructive">스터디 삭제</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default StudySettingPage;
