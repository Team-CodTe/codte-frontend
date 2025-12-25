import { type DailyAssignment } from '@/api/assignment/getDailyAssignments/type';
import { TierBadge } from '@/components/common/TierBadge';
import { Badge } from '@/components/ui/Badge';
import { PATH } from '@/constants/path';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

type Props = {
  studyId?: number | undefined;
};

export const dailyAssignmentsTableColumns = ({
  studyId,
}: Props): ColumnDef<DailyAssignment>[] => [
  {
    accessorKey: 'bojNumber',
    header: '문제 번호',
    meta: {
      className: 'w-[20%]',
    },
    cell: ({ row }) => {
      const assignment = row.original;

      return (
        <div className="flex items-center gap-2">
          <TierBadge level={assignment.tier} />
          <Link
            id={assignment.bojNumber.toString()}
            aria-label={`문제 ${assignment.bojNumber}로 이동`}
            href={assignment.link}
            target="_blank"
            rel="noreferrer"
            className="hover:underline">
            {assignment.bojNumber}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'problemTitle',
    header: '제목',
    meta: {
      className: 'w-[40%]',
    },
    cell: ({ row }) => {
      const assignment = row.original;
      const isCustom = assignment.isCustom === true;

      return (
        <div className="flex flex-row items-center gap-2">
          <Link
            id={assignment.bojNumber.toString()}
            aria-label={`문제 ${assignment.bojNumber}로 이동`}
            href={assignment.link}
            target="_blank"
            rel="noreferrer"
            className="hover:underline">
            {assignment.title}
          </Link>
          {isCustom && <Badge variant="secondary">추가됨</Badge>}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: '문제 풀이 글',
    meta: {
      className: 'w-[20%]',
    },
    cell: ({ row }) => {
      if (studyId === undefined) {
        return <span>작성하기</span>;
      }

      const problemId = row.original.problemId;

      const noteWriteUrl = buildUrlWithParams({
        url: PATH.STUDY.NOTE.WRITE,
        pathParams: { studyId },
        queryParams: { problemId },
      });

      return (
        <Link
          id={`note-write-${problemId}`}
          aria-label={`${problemId} 문제 풀이 글 작성`}
          href={noteWriteUrl}
          className="hover:pointer-cursor">
          작성하기
        </Link>
      );
    },
  },
];
