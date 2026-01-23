import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/Pagination';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const NotesPagination = ({ page, totalPages, onPageChange }: Props) => {
  const isPaginationDisabled = totalPages <= 1;

  const renderPaginationItems = () => {
    if (totalPages <= 1) {
      return (
        <PaginationItem key={1}>
          <PaginationLink
            isActive
            className="pointer-events-none cursor-default opacity-50">
            1
          </PaginationLink>
        </PaginationItem>
      );
    }

    const items: React.ReactNode[] = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, page - halfVisible);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => onPageChange(1)}
            className="cursor-default">
            1
          </PaginationLink>
        </PaginationItem>,
      );

      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === page}
            onClick={() => onPageChange(i)}
            className="cursor-default">
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => onPageChange(totalPages)}
            className="cursor-default">
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            onClick={() => onPageChange(page - 1)}
            aria-disabled={page <= 1 || isPaginationDisabled}
            className={
              page <= 1 || isPaginationDisabled
                ? 'pointer-events-none opacity-50'
                : 'cursor-default'
            }>
            <ChevronLeftIcon />
          </PaginationLink>
        </PaginationItem>

        {renderPaginationItems()}

        <PaginationItem>
          <PaginationLink
            onClick={() => onPageChange(page + 1)}
            aria-disabled={page >= totalPages || isPaginationDisabled}
            className={
              page >= totalPages || isPaginationDisabled
                ? 'pointer-events-none opacity-50'
                : 'cursor-default'
            }>
            <ChevronRightIcon />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
