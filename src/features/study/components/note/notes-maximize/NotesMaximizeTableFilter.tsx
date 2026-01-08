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
    <div className="mt-3 flex flex-row items-center justify-between gap-4">
      <span className="text-muted-foreground shrink-0 font-medium whitespace-nowrap">
        {totalCount}개 풀이 글 조회됨
      </span>

      <div className="flex gap-2">
        {isFiltered && (
          <Button variant="ghost" size="icon" onClick={onResetFilters}>
            <RotateCwIcon />
          </Button>
        )}
        <Popover open={openAssignedDate} onOpenChange={setOpenAssignedDate}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon-responsive">
              <CalendarSearchIcon />
              <span className="hidden sm:inline">
                {selectedAssignedDate ? (
                  <span className="hidden sm:inline">
                    {formatDate(selectedAssignedDate, {
                      includeTime: false,
                    })}
                  </span>
                ) : (
                  '추천 날짜'
                )}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
            <Calendar
              mode="single"
              selected={selectedAssignedDate}
              onSelect={handleAssignedDateChange}
            />
          </PopoverContent>
        </Popover>

        <Popover open={openUpdatedDate} onOpenChange={setOpenUpdatedDate}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon-responsive">
              <CalendarCheck2Icon />
              <span className="hidden sm:inline">
                {selectedUpdatedDate ? (
                  <span className="hidden sm:inline">
                    {formatDate(selectedUpdatedDate, {
                      includeTime: false,
                    })}
                  </span>
                ) : (
                  '작성일'
                )}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedUpdatedDate}
              onSelect={handleUpdatedDateChange}
            />
          </PopoverContent>
        </Popover>

        <div className="relative w-full">
          <Input
            id="search"
            type="text"
            inputMode="search"
            placeholder="검색..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="h-9 pr-9"
          />
          {keyword && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setKeyword('')}
              className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 h-9 rounded-l-none hover:bg-transparent">
              <CircleXIcon />
              <span className="sr-only">검색어 초기화</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
