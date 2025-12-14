'use client';

import { useTransition } from 'react';

import { useMyStudiesQuery } from '@/api/study/getMyStudies/query';
import { type GetMyStudiesResponse } from '@/api/study/getMyStudies/type';
import { PATH } from '@/constants/path';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { useRouter } from 'next/navigation';

import { StudiesTable } from './StudiesTable';
import { studiesTableColumns } from './StudiesTableColumns';

type Props = {
  initialData: GetMyStudiesResponse[];
};

export const Studies = ({ initialData }: Props) => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();
  const { data } = useMyStudiesQuery({ initialData });

  const onClickRow = (study: GetMyStudiesResponse) => {
    if (isNavigating) {
      return;
    }

    startTransition(() => {
      router.push(
        buildUrlWithParams({
          url: PATH.STUDY.MAIN,
          pathParams: { id: study.studyId },
        }),
      );
    });
  };

  return (
    <StudiesTable
      data={data ?? []}
      columns={studiesTableColumns}
      onClickRow={onClickRow}
    />
  );
};
