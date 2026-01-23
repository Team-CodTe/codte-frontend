import { getMyStudies } from '@/api/study/getMyStudies/fetch';
import { Studies } from '@/features/dashboard/components/studies/Studies';
import { StudiesFallback } from '@/features/dashboard/components/studies/StudiesFallback';
import { withSuspense } from '@/hoc/withSuspense';

export const StudiesSuspense = withSuspense(
  async () => {
    const data = await getMyStudies();

    return <Studies initialData={data} />;
  },
  { fallback: <StudiesFallback /> },
);
