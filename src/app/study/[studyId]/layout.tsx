import { type PropsWithChildren } from 'react';

import { getStudyDetail } from '@/api/study/getStudyDetail/fetch';
import { PATH } from '@/constants/path';
import { StudyMainHeader } from '@/features/study/components/main/StudyMainHeader';
import { FetchError } from '@/lib/fetchInstance';
import { type Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

type Props = {
  params: Promise<{
    studyId: number;
  }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { studyId } = await params;

  try {
    const study = await getStudyDetail(studyId);

    return {
      title: study.name,
    };
  } catch (error) {
    if (error instanceof FetchError) {
      if (error.status === 401) {
        redirect(PATH.LOGIN);
      }

      if (error.status === 403 || error.status === 404) {
        // 가입되지 않은 스터디나 없는 스터디
        notFound();
      }
    }

    return {
      title: 'CodTe',
    };
  }
};

const StudyMainLayout = async ({
  children,
  params,
}: PropsWithChildren<Props>) => {
  const { studyId } = await params;
  let study;

  try {
    study = await getStudyDetail(studyId);
  } catch (error) {
    if (error instanceof FetchError) {
      if (error.status === 401) {
        redirect(PATH.LOGIN);
      }

      if (error.status === 403 || error.status === 404) {
        // 가입되지 않은 스터디나 없는 스터디
        notFound();
      }
    }

    throw error;
  }

  return (
    <div className="flex min-h-screen flex-col items-center lg:h-screen lg:overflow-hidden">
      <StudyMainHeader study={study} />
      {children}
    </div>
  );
};

export default StudyMainLayout;
