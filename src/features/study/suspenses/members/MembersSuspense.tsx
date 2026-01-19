import { getMembers } from '@/api/study/getMembers/fetch';
import { withSuspense } from '@/hoc/withSuspense';

import { Members } from '../../components/setting/members/Members';
import { MembersFallback } from '../../components/setting/members/MembersFallback';

type Props = {
  studyId: number;
};

export const MembersSuspense = withSuspense(
  async ({ studyId }: Props) => {
    const data = await getMembers(studyId);

    return <Members studyId={studyId} initialData={data} />;
  },
  { fallback: <MembersFallback /> },
);
