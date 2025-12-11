import { type PropsWithChildren } from 'react';

import { getStudyDetail } from '@/api/study/getStudyDetail/fetch';
import { StudyMainHeader } from '@/features/study/components/id/StudyMainHeader';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const StudyMainLayout = async ({
  children,
  params,
}: PropsWithChildren<Props>) => {
  const { id } = await params;
  const study = await getStudyDetail(id);

  return (
    <div className="bg-background flex min-h-screen flex-col items-center lg:h-screen lg:overflow-hidden">
      <StudyMainHeader studyName={study.name} inviteCode={study.inviteCode} />
      {children}
    </div>
  );
};

export default StudyMainLayout;
