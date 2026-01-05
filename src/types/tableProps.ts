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
  onClickRow?: (data: TData) => void;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};
