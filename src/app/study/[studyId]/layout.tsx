import { type PropsWithChildren } from 'react';

import { StudyMainHeaderSuspense } from '@/features/study/suspenses/StudyMainHeaderSuspense';

type Props = {
  params: Promise<{
    studyId: string;
  }>;
};

const StudyMainLayout = async ({
  children,
  params,
}: PropsWithChildren<Props>) => {
  const { studyId } = await params;
  const studyIdNum = parseInt(studyId, 10);

  return (
    <div className="flex min-h-screen flex-col items-center lg:h-screen lg:overflow-hidden">
      <StudyMainHeaderSuspense studyId={studyIdNum} />
      {children}
    </div>
  );
};

export default StudyMainLayout;
