import { getMyStudies } from '@/api/study/getMyStudies/fetch';
import { withSuspense } from '@/hoc/withSuspense';

import { Studies } from '../components/home/section/studies/Studies';
import { StudiesFallback } from '../components/home/section/studies/StudiesFallback';

export const StudiesSuspense = withSuspense(
  async () => {
    const data = await getMyStudies();

    return <Studies initialData={data} />;
  },
  { fallback: <StudiesFallback /> },
);
