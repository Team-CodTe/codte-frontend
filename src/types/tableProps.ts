import { type ColumnDef } from '@tanstack/react-table';

export type TableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isLoading?: boolean;
  onClickRow?: (data: TData) => void;
};

export type TablePropsWithInfiniteScroll<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isLoading?: boolean;
  isFiltered?: boolean;
  onClickRow?: (data: TData) => void;
  fetchNextPage?: () => void;
  isFetching?: boolean;
  totalRowCount?: number;
  scrollRef?: (node: HTMLDivElement | null) => void;
};
