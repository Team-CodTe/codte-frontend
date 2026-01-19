'use client';

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

import { useStatisticsParams } from '../../hooks/useStatisticsParams';

type Props = {
  initialData: GetMyStudiesResponse[];
  defaultStudyId: number;
};

export const StatisticsStudySelect = ({
  initialData,
  defaultStudyId,
}: Props) => {
  const { data: studies } = useMyStudiesQuery({ initialData });
  const studyIds = studies?.map((study) => study.studyId) ?? [];
  const { studyId, handleChangeStudyId, isPending } = useStatisticsParams(
    defaultStudyId,
    studyIds,
  );

  if (!studies || studies.length === 0) {
    return null;
  }

  return (
    <Select
      value={studyId.toString()}
      onValueChange={(value) => handleChangeStudyId(safeParseInt(value))}
      disabled={isPending}>
      <SelectTrigger size="sm" variant="secondary" className="max-w-36">
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
  );
};
