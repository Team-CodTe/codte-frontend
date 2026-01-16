import { getMyProfile } from '@/api/user/getMyProfile/fetch';
import { withSuspense } from '@/hoc/withSuspense';

import { DashboardTitle } from '../components/intro/DashboardTitle';
import { DashboardTitleFallback } from '../components/intro/DashboardTitleFallback';

export const DashboardTitleSuspense = withSuspense(
  async () => {
    const data = await getMyProfile();

    return <DashboardTitle initialData={data} />;
  },
  {
    fallback: <DashboardTitleFallback />,
  },
);
