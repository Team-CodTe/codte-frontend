import { type PropsWithChildren } from 'react';

import { getStudyDetail } from '@/api/study/getStudyDetail/fetch';
import { getMyProfile } from '@/api/user/getMyProfile/fetch';
import { PATH } from '@/constants/path';
import { StudyMainHeader } from '@/features/study/components/main/StudyMainHeader';
import { FetchError } from '@/lib/fetchInstance';
import { notFound, redirect } from 'next/navigation';

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

  let study;
  let user;

  try {
    [study, user] = await Promise.all([
      getStudyDetail(studyIdNum),
      getMyProfile(),
    ]);
  } catch (error) {
    if (error instanceof FetchError) {
      if (error.status === 401) {
        redirect(PATH.LOGIN);
      }

      if (error.status === 403 || error.status === 404) {
        notFound();
      }
    }

    throw error;
  }

  return (
    <div className="flex min-h-screen flex-col items-center lg:h-screen lg:overflow-hidden">
      <StudyMainHeader study={study} user={user} />
      {children}
    </div>
  );
};

export default StudyMainLayout;
