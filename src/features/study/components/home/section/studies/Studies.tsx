'use client';

import { useMyStudiesQuery } from '@/api/study/getMyStudies/query';
import { type GetMyStudiesResponse } from '@/api/study/getMyStudies/type';
import { type ListResponseWrapper } from '@/types/responseWrapper';

import { StudiesTable } from './StudiesTable';
import { studiesTableColumns } from './StudiesTableColumns';

type Props = {
  initialData: ListResponseWrapper<GetMyStudiesResponse>;
};

export const Studies = ({ initialData }: Props) => {
  const { data } = useMyStudiesQuery({ initialData });

  return <StudiesTable data={data ?? []} columns={studiesTableColumns} />;
};
