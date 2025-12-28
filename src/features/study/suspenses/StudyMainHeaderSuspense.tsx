import { getStudyDetail } from '@/api/study/getStudyDetail/fetch';
import { PATH } from '@/constants/path';
import { withSuspense } from '@/hoc/withSuspense';
import { FetchError } from '@/lib/fetchInstance';
import { notFound, redirect } from 'next/navigation';

import { StudyMainHeader } from '../components/main/StudyMainHeader';
import { StudyMainHeaderFallback } from '../components/main/StudyMainHeaderFallback';

type Props = {
  studyId: number;
};

export const StudyMainHeaderSuspense = withSuspense(
  async ({ studyId }: Props) => {
    let data;

    try {
      data = await getStudyDetail(studyId);
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

    return <StudyMainHeader studyId={studyId} initialData={data} />;
  },
  {
    fallback: <StudyMainHeaderFallback />,
  },
);
