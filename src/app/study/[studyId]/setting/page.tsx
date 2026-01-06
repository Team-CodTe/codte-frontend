import { getStudyDetail } from '@/api/study/getStudyDetail/fetch';
import { DangerZoneSection } from '@/features/study/components/setting/DangerZoneSection';
import { StudyInfoSection } from '@/features/study/components/setting/StudyInfoSection';
import { safeParseInt } from '@/lib/parseParam';

type Props = {
  params: Promise<{
    studyId: string;
  }>;
};

const StudySettingPage = async ({ params }: Props) => {
  const studyId = safeParseInt((await params).studyId);
  const study = await getStudyDetail(studyId);

  return (
    <main className="min-h-0 w-full flex-1 overflow-y-auto">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 p-5 pt-4 pb-8 md:gap-16 md:px-0 md:pt-4 md:pb-16">
        <StudyInfoSection study={study} />
        <DangerZoneSection study={study} />
      </div>
    </main>
  );
};

export default StudySettingPage;
