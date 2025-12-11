import { type ColumnDef } from '@tanstack/react-table';

export type TableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isLoading?: boolean;
};
