'use client';

import { useTransition } from 'react';

import { useMyStudiesQuery } from '@/api/study/getMyStudies/query';
import { type GetMyStudiesResponse } from '@/api/study/getMyStudies/type';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { safeParseInt } from '@/lib/parseParam';
import { ChartColumnIncreasingIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { parseAsInteger, useQueryState } from 'nuqs';

type Props = {
  initialData: GetMyStudiesResponse[];
  defaultStudyId: number;
};

export const StatisticsHeader = ({ initialData, defaultStudyId }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [studyId, setStudyId] = useQueryState(
    'studyId',
    parseAsInteger.withDefault(defaultStudyId),
  );
  const { data: studies } = useMyStudiesQuery({ initialData });

  const handleStudyChange = (value: string) => {
    const newId = safeParseInt(value);

    if (newId === studyId) {
      return;
    }

    startTransition(async () => {
      await setStudyId(newId);
      router.refresh();
    });
  };

  return (
    <div className="flex min-h-8 w-full flex-row items-center justify-between gap-3">
      <div className="text-muted-foreground flex h-8 shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap">
        <ChartColumnIncreasingIcon className="size-3.5" />
        <span>문제 풀이 통계</span>
      </div>

      {studies && (
        <Select
          value={studyId.toString()}
          onValueChange={handleStudyChange}
          disabled={isPending}>
          <SelectTrigger size="sm" variant="secondary">
            <SelectValue placeholder="스터디 선택" />
          </SelectTrigger>
          <SelectContent align="end">
            {studies.map((study) => (
              <SelectItem key={study.studyId} value={study.studyId.toString()}>
                {study.studyName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
