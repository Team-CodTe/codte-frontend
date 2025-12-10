'use client';

import { useMyStudiesQuery } from '@/api/study/getMyStudies/query';
import { type GetMyStudiesResponseWrapper } from '@/api/study/getMyStudies/type';

import { StudiesTable } from './StudiesTable';
import { studiesTableColumns } from './StudiesTableColumns';
import { StudiesTableHeader } from './StudiesTableHeader';

type Props = {
  initialData: GetMyStudiesResponseWrapper;
};

export const StudiesSection = ({ initialData }: Props) => {
  const { data } = useMyStudiesQuery({ initialData });

  return (
    <div className="flex w-full flex-col space-y-3">
      <StudiesTableHeader />
      <StudiesTable data={data?.data ?? []} columns={studiesTableColumns} />
    </div>
  );
};
