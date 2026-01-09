'use client';

import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import { Input } from '@/components/ui/Input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { formatDate } from '@/lib/formatDate';
import {
  CalendarCheck2Icon,
  CalendarSearchIcon,
  CircleXIcon,
  RotateCwIcon,
  SearchIcon,
} from 'lucide-react';

type DateFilterProps = {
  openAssignedDate: boolean;
  openUpdatedDate: boolean;
  setOpenAssignedDate: (open: boolean) => void;
  setOpenUpdatedDate: (open: boolean) => void;
  selectedAssignedDate: Date | undefined;
  selectedUpdatedDate: Date | undefined;
  handleAssignedDateChange: (date: Date | undefined) => void;
  handleUpdatedDateChange: (date: Date | undefined) => void;
};

type Props = {
  totalCount: number;
  dateFilter: DateFilterProps;
  keyword: string;
  setKeyword: (value: string) => void;
  onResetFilters: () => void;
  isFiltered: boolean;
};

export const NotesMaximizeTableFilter = ({
  totalCount,
  dateFilter,
  keyword,
  setKeyword,
  onResetFilters,
  isFiltered,
}: Props) => {
  const {
    openAssignedDate,
    openUpdatedDate,
    setOpenAssignedDate,
    setOpenUpdatedDate,
    selectedAssignedDate,
    selectedUpdatedDate,
    handleAssignedDateChange,
    handleUpdatedDateChange,
  } = dateFilter;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <div className="xs:order-2 order-1 ml-auto flex items-center gap-2">
        {isFiltered && (
          <Button variant="ghost" size="icon" onClick={onResetFilters}>
            <RotateCwIcon />
          </Button>
        )}

        <Popover open={openAssignedDate} onOpenChange={setOpenAssignedDate}>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarSearchIcon />
              {selectedAssignedDate
                ? formatDate(selectedAssignedDate, { includeTime: false })
                : '문제 추천 날짜'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={selectedAssignedDate}
              onSelect={handleAssignedDateChange}
            />
          </PopoverContent>
        </Popover>

        <Popover open={openUpdatedDate} onOpenChange={setOpenUpdatedDate}>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarCheck2Icon />
              {selectedUpdatedDate
                ? formatDate(selectedUpdatedDate, { includeTime: false })
                : '작성일'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={selectedUpdatedDate}
              onSelect={handleUpdatedDateChange}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="xs:order-3 xs:w-80 relative order-2 ml-auto w-full">
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
          <SearchIcon className="size-4" />
          <span className="sr-only">검색 아이콘</span>
        </div>
        <Input
          id="search"
          type="text"
          inputMode="search"
          placeholder="문제 번호, 제목, 작성자로 검색..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="px-9"
        />
        {keyword && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setKeyword('')}
            className="text-muted-foreground absolute inset-y-0 right-0 hover:bg-transparent">
            <CircleXIcon />
            <span className="sr-only">검색어 초기화</span>
          </Button>
        )}
      </div>

      <div className="xs:order-1 xs:text-start order-3 min-w-fit flex-1 text-end">
        <span className="text-muted-foreground text-sm font-medium whitespace-nowrap">
          {totalCount}개 풀이 글 조회됨
        </span>
      </div>
    </div>
  );
};
