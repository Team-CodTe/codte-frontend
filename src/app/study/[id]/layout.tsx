import { type PropsWithChildren } from 'react';

import { getStudyDetail } from '@/api/study/getStudyDetail/fetch';
import { StudyMainHeader } from '@/features/study/components/id/StudyMainHeader';
import { type Metadata } from 'next';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const study = await getStudyDetail(id);

  return {
    title: `CodTe - ${study.name}`,
  };
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
