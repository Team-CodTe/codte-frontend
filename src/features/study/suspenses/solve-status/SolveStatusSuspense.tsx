import { getSolveStatus } from '@/api/solve-status/getSolveStatus/fetch';
import {
  VIEW_METHOD,
  type ViewMethod,
} from '@/api/solve-status/getSolveStatus/type';
import { withSuspense } from '@/hoc/withSuspense';

import { SolveStatus } from '../../components/main/solve-status/SolveStatus';
import { SolveStatusFallback } from '../../components/main/solve-status/SolveStatusFallback';

type Props = {
  studyId: number;
  date?: string;
  view?: ViewMethod;
};

export const SolveStatusSuspense = withSuspense(
  async ({ studyId, date, view }: Props) => {
    const data = await getSolveStatus({ studyId, date, view });

    return <SolveStatus initialData={data} view={view} />;
  },
  {
    fallback: ({ view }) => (
      <SolveStatusFallback view={view ?? VIEW_METHOD.GROUP} />
    ),
  },
);
