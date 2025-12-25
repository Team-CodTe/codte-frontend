import { type GetNoteDetailResponse } from '@/api/note/getNoteDetail/type';
import { TierBadge } from '@/components/common/TierBadge';
import { formatDate } from '@/lib/formatDate';
import { type ColumnDef } from '@tanstack/react-table';

export const NOTES_TABLE_COLUMNS: ColumnDef<GetNoteDetailResponse>[] = [
  {
    accessorKey: 'assignedDate',
    header: '문제 추천 날짜',
    meta: {
      className: 'w-[25%]',
    },
    cell: ({ row }) => {
      return (
        <div>
          {formatDate(row.original.assignedDate, { includeTime: false })}
        </div>
      );
    },
  },
  {
    accessorKey: 'problemBojNumber',
    header: '문제 번호',
    meta: {
      className: 'w-[20%]',
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <TierBadge level={row.original.problemBojTier} />
          <a
            id={row.original.problemBojNumber.toString()}
            href={row.original.problemLink}
            target="_blank"
            rel="noreferrer">
            {row.original.problemBojNumber}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: 'username',
    header: '작성자',
    meta: {
      className: 'w-[20%]',
    },
    cell: ({ row }) => {
      return (
        <div>
          <span>{row.original.username}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: '작성일',
    meta: {
      className: 'w-[30%]',
    },
    cell: ({ row }) => {
      return <div>{formatDate(row.original.createdAt)}</div>;
    },
  },
];
