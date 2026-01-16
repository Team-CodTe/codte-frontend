'use client';

import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import { Input } from '@/components/ui/Input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { PATH } from '@/constants/path';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { formatDate } from '@/lib/formatFunc';
import { STUDY_ROLE, type StudyRole } from '@/types/studyRole';
import {
  CalendarCheck2Icon,
  CalendarSearchIcon,
  CircleXIcon,
  FileCog2Icon,
  RotateCwIcon,
  SearchIcon,
} from 'lucide-react';
import Link from 'next/link';

import { SelectAssignmentDropdownButton } from '../write/SelectAssignmentDropdownButton';

type DateFilterProps = {
  openAssignedDate: boolean;
  openCreatedDate: boolean;
  setOpenAssignedDate: (open: boolean) => void;
  setOpenCreatedDate: (open: boolean) => void;
  selectedAssignedDate: Date | undefined;
  selectedCreatedDate: Date | undefined;
  handleAssignedDateChange: (date: Date | undefined) => void;
  handleCreatedDateChange: (date: Date | undefined) => void;
};

type Props = {
  studyId: number;
  role: StudyRole;
  dateFilter: DateFilterProps;
  keyword: string;
  setKeyword: (value: string) => void;
  onResetFilters: () => void;
  isFiltered: boolean;
};

export const NotesMaximizeTableFilter = ({
  studyId,
  role,
  dateFilter,
  keyword,
  setKeyword,
  onResetFilters,
  isFiltered,
}: Props) => {
  const {
    openAssignedDate,
    openCreatedDate,
    setOpenAssignedDate,
    setOpenCreatedDate,
    selectedAssignedDate,
    selectedCreatedDate,
    handleAssignedDateChange,
    handleCreatedDateChange,
  } = dateFilter;

  const isEditable = role === STUDY_ROLE.OWNER;

  const templateManagePageUrl = buildUrlWithParams({
    url: PATH.STUDY.NOTES.TEMPLATE,
    pathParams: { studyId },
  });

  return (
    <div className="flex flex-col items-end gap-3 md:flex-row md:items-center md:justify-between">
      <div className="order-last flex w-full flex-col items-end justify-end gap-2 sm:flex-row sm:items-center sm:justify-start md:order-first">
        <div className="relative order-last max-sm:w-full sm:order-first">
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
            <SearchIcon className="size-4" />
            <span className="sr-only">검색 아이콘</span>
          </div>
          <Input
            id="search"
            type="text"
            inputMode="search"
            placeholder="문제 번호 • 제목 • 작성자"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="px-9"
          />
          {keyword && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setKeyword('')}
              className="text-muted-foreground absolute inset-y-0 right-0 hover:bg-transparent dark:hover:bg-transparent">
              <CircleXIcon />
              <span className="sr-only">검색어 초기화</span>
            </Button>
          )}
        </div>

        <div className="order-first flex items-center gap-2 sm:order-last">
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

          <Popover open={openCreatedDate} onOpenChange={setOpenCreatedDate}>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarCheck2Icon />
                {selectedCreatedDate
                  ? formatDate(selectedCreatedDate, { includeTime: false })
                  : '작성일'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedCreatedDate}
                onSelect={handleCreatedDateChange}
              />
            </PopoverContent>
          </Popover>

          {isFiltered && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onResetFilters}
              className="order-first sm:order-last">
              <RotateCwIcon />
            </Button>
          )}
        </div>
      </div>

      <div className="order-first flex gap-2 md:order-last">
        {isEditable && (
          <Button variant="secondary" asChild>
            <Link
              id="manage-template-link"
              aria-label="템플릿 관리 페이지로 이동"
              href={templateManagePageUrl}
              className="cursor-default">
              <FileCog2Icon />
              <span>템플릿 관리</span>
            </Link>
          </Button>
        )}

        <SelectAssignmentDropdownButton studyId={studyId} />
      </div>
    </div>
  );
};
