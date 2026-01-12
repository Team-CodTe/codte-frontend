import { type PropsWithChildren } from 'react';

import { StudyMainHeaderSuspense } from '@/features/study/suspenses/common/StudyMainHeaderSuspense';
import { safeParseInt } from '@/lib/parseParam';

type Props = {
  params: Promise<{
    studyId: string;
  }>;
};

const StudyMainLayout = async ({
  children,
  params,
}: PropsWithChildren<Props>) => {
  const studyId = safeParseInt((await params).studyId);

  return (
    <div className="flex flex-col items-center">
      <StudyMainHeaderSuspense studyId={studyId} />
      {children}
    </div>
  );
};

export default StudyMainLayout;
