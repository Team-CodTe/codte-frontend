import {
  type AssignmentStatusItem,
  NOTE_STATUS,
  PROBLEM_STATUS,
} from '@/api/solve-status/getSolveStatus/type';
import { Badge } from '@/components/ui/Badge';
import { type ColumnDef } from '@tanstack/react-table';

export const solveStatusMeColumns = (): ColumnDef<AssignmentStatusItem>[] => [
  {
    accessorKey: 'title',
    header: '제목',
    meta: {
      className: 'w-[30%]',
    },
    cell: ({ row }) => {
      return (
        <span className="block max-w-32 truncate">{row.original.title}</span>
      );
    },
  },
  {
    accessorKey: 'problemStatus',
    header: '문제 풀이 상태',
    meta: {
      className: 'w-[35%]',
    },
    cell: ({ row }) => {
      const { problemStatus } = row.original;

      switch (problemStatus) {
        case PROBLEM_STATUS.NOT_ATTEMPTED:
          return (
            <Badge variant="secondary">
              <div className="bg-muted-foreground size-2 rounded-full" />
              <span>풀기 전</span>
            </Badge>
          );
        case PROBLEM_STATUS.IN_PROGRESS:
          return (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <div className="bg-primary size-2 rounded-full" />
              <span>푸는 중</span>
            </Badge>
          );
        case PROBLEM_STATUS.COMPLETED:
          return (
            <Badge variant="secondary" className="bg-success/10 text-success">
              <div className="bg-success size-2 rounded-full" />
              <span>완료</span>
            </Badge>
          );
      }
    },
  },
  {
    accessorKey: 'noteStatus',
    header: '풀이 글 작성 상태',
    meta: {
      className: 'w-[35%]',
    },
    cell: ({ row }) => {
      const { noteStatus } = row.original;

      switch (noteStatus) {
        case NOTE_STATUS.NOT_COMPLETED:
          return (
            <Badge variant="secondary">
              <div className="bg-muted-foreground size-2 rounded-full" />
              <span>작성 전</span>
            </Badge>
          );
        case NOTE_STATUS.COMPLETED:
          return (
            <Badge variant="secondary" className="bg-success/10 text-success">
              <div className="bg-success size-2 rounded-full" />
              <span>완료</span>
            </Badge>
          );
      }
    },
  },
];
