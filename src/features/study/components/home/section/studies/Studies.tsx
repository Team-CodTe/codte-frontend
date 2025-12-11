'use client';

import { useMyStudiesQuery } from '@/api/study/getMyStudies/query';
import { type GetMyStudiesResponse } from '@/api/study/getMyStudies/type';

import { StudiesTable } from './StudiesTable';
import { studiesTableColumns } from './StudiesTableColumns';

type Props = {
  initialData: GetMyStudiesResponse[];
};

export const Studies = ({ initialData }: Props) => {
  const { data } = useMyStudiesQuery({ initialData });

  return <StudiesTable data={data ?? []} columns={studiesTableColumns} />;
};
