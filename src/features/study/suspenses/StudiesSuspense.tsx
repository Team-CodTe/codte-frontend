import { getMyStudies } from '@/api/study/getMyStudies/fetch';
import { Spinner } from '@/components/ui/Spinner';
import { withSuspense } from '@/hoc/withSuspense';

import { StudiesSection } from '../components/home/section/studies/StudiesSection';

export const StudiesSuspense = withSuspense(
  async () => {
    const data = await getMyStudies();

    return <StudiesSection initialData={data} />;
  },
  { fallback: <Spinner /> },
);
