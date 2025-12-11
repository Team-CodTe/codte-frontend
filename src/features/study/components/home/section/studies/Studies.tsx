'use client';

import { useMyStudiesQuery } from '@/api/study/getMyStudies/query';
import { type GetMyStudiesResponse } from '@/api/study/getMyStudies/type';
import { PATH } from '@/constants/path';
import { useRouter } from 'next/navigation';

import { StudiesTable } from './StudiesTable';
import { studiesTableColumns } from './StudiesTableColumns';

type Props = {
  initialData: GetMyStudiesResponse[];
};

export const Studies = ({ initialData }: Props) => {
  const router = useRouter();
  const { data } = useMyStudiesQuery({ initialData });

  const handleRowClick = (study: GetMyStudiesResponse) => {
    router.push(`${PATH.STUDY.HOME}/${study.studyId}`);
  };

  return (
    <StudiesTable
      data={data ?? []}
      columns={studiesTableColumns}
      onRowClick={handleRowClick}
    />
  );
};
