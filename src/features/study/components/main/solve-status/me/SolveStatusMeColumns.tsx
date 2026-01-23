import {
  type AssignmentStatusItem,
  NOTE_STATUS,
  PROBLEM_STATUS,
} from '@/api/solve-status/getSolveStatus/type';
import { type ColumnDef } from '@tanstack/react-table';

import { StatusBadge } from './StatusBadge';

const STATUS_CONFIG = {
  PROBLEM: {
    [PROBLEM_STATUS.NOT_ATTEMPTED]: {
      label: '풀기 전',
      style: 'bg-muted-foreground',
      badgeClass: '',
    },
    [PROBLEM_STATUS.IN_PROGRESS]: {
      label: '푸는 중',
      style: 'bg-primary',
      badgeClass: 'bg-primary/10 text-primary',
    },
    [PROBLEM_STATUS.COMPLETED]: {
      label: '완료',
      style: 'bg-success',
      badgeClass: 'bg-success/10 text-success',
    },
  },
  NOTE: {
    [NOTE_STATUS.NOT_COMPLETED]: {
      label: '작성 전',
      style: 'bg-muted-foreground',
      badgeClass: '',
    },
    [NOTE_STATUS.COMPLETED]: {
      label: '완료',
      style: 'bg-success',
      badgeClass: 'bg-success/10 text-success',
    },
  },
} as const;

export const solveStatusMeColumns: ColumnDef<AssignmentStatusItem>[] = [
  {
    accessorKey: 'title',
    header: '제목',
    meta: { className: 'w-[30%]' },
    cell: ({ row }) => (
      <span className="block max-w-32 truncate">{row.original.title}</span>
    ),
  },
  {
    accessorKey: 'problemStatus',
    header: '문제 풀이 상태',
    meta: { className: 'w-[35%]' },
    cell: ({ row }) => {
      const status = row.original.problemStatus;
      const config = STATUS_CONFIG.PROBLEM[status];

      return <StatusBadge config={config} />;
    },
  },
  {
    accessorKey: 'noteStatus',
    header: '풀이 글 작성 상태',
    meta: { className: 'w-[35%]' },
    cell: ({ row }) => {
      const status = row.original.noteStatus;
      const config = STATUS_CONFIG.NOTE[status];

      return <StatusBadge config={config} />;
    },
  },
];
