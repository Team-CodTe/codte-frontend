import { getMyProfile } from '@/api/user/getMyProfile/fetch';
import { withSuspense } from '@/hoc/withSuspense';

import { StudyHomeTitle } from '../../components/home/StudyHomeTitle';
import { StudyHomeTitleFallback } from '../../components/home/StudyHomeTitleFallback';

export const StudyHomeTitleSuspense = withSuspense(
  async () => {
    const data = await getMyProfile();

    return <StudyHomeTitle initialData={data} />;
  },
  {
    fallback: <StudyHomeTitleFallback />,
  },
);
