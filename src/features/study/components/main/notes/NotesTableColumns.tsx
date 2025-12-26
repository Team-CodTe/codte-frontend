import { type GetNoteDetailResponse } from '@/api/note/getNoteDetail/type';
import { TierBadge } from '@/components/common/TierBadge';
import { formatDate } from '@/lib/formatDate';
import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const NOTES_TABLE_COLUMNS: ColumnDef<GetNoteDetailResponse>[] = [
  {
    accessorKey: 'assignedDate',
    header: '문제 추천 날짜',
    meta: {
      className: 'w-[20%]',
    },
    cell: ({ row }) => {
      return (
        <span>
          {formatDate(row.original.assignedDate, { includeTime: false })}
        </span>
      );
    },
  },
  {
    accessorKey: 'problemBojNumber',
    header: '문제 번호',
    meta: {
      className: 'w-[15%]',
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <TierBadge level={row.original.problemBojTier} />
          <Link
            id={row.original.problemBojNumber.toString()}
            aria-label={`${row.original.problemBojNumber} 문제로 이동`}
            href={row.original.problemLink}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
            onClick={(e) => e.stopPropagation()}>
            {row.original.problemBojNumber}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'problemTitle',
    header: '제목',
    meta: {
      className: 'w-[35%]',
    },
    cell: ({ row }) => {
      return (
        <Link
          id={row.original.problemBojNumber.toString()}
          aria-label={`문제 ${row.original.problemBojNumber}로 이동`}
          href={row.original.problemLink}
          target="_blank"
          rel="noreferrer"
          className="inline-block max-w-md truncate hover:underline"
          onClick={(e) => e.stopPropagation()}>
          {row.original.problemTitle}
        </Link>
      );
    },
  },
  {
    accessorKey: 'username',
    header: '작성자',
    meta: {
      className: 'w-[10%]',
    },
    cell: ({ row }) => {
      return <span>{row.original.username}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: '작성일',
    meta: {
      className: 'w-[20%]',
    },
    cell: ({ row }) => {
      return <span>{formatDate(row.original.createdAt)}</span>;
    },
  },
];
