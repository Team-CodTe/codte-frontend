import { getStudyDetail } from '@/api/study/getStudyDetail/fetch';
import { DangerZoneSection } from '@/features/study/components/setting/DangerZoneSection';
import { StudyInfoSection } from '@/features/study/components/setting/StudyInfoSection';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const StudySettingPage = async ({ params }: Props) => {
  const { id } = await params;
  const study = await getStudyDetail(id);

  return (
    <main className="min-h-0 w-full flex-1 overflow-y-auto">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-18 p-5 md:p-10 md:px-0">
        <StudyInfoSection study={study} />
        <DangerZoneSection study={study} />
      </div>
    </main>
  );
};

export default StudySettingPage;
