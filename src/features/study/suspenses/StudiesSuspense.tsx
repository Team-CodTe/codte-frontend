import { getMyStudies } from '@/api/study/getMyStudies/fetch';
import { withSuspense } from '@/hoc/withSuspense';

import { Studies } from '../components/home/studies/Studies';
import { StudiesFallback } from '../components/home/studies/StudiesFallback';

export const StudiesSuspense = withSuspense(
  async () => {
    const data = await getMyStudies();

    return <Studies initialData={data} />;
  },
  { fallback: <StudiesFallback /> },
);
