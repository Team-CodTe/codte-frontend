import { getMyStudies } from '@/api/study/getMyStudies/fetch';
import { Spinner } from '@/components/ui/Spinner';
import { withSuspense } from '@/hoc/withSuspense';

import { Studies } from '../components/home/section/studies/Studies';

export const StudiesSuspense = withSuspense(
  async () => {
    const data = await getMyStudies();

    return <Studies initialData={data} />;
  },
  { fallback: <Spinner /> },
);
