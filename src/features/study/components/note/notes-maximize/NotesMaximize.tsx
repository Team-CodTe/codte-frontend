'use client';

import { useTransition } from 'react';

import { type GetNoteDetailResponse } from '@/api/note/getNoteDetail/type';
import { useNotesQuery } from '@/api/note/getNotes/query';
import { type GetNotesResponse } from '@/api/note/getNotes/type';
import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import { Input } from '@/components/ui/Input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { Separator } from '@/components/ui/Separator';
import { PATH } from '@/constants/path';
import { useSelectDate } from '@/features/study/hooks/useSelectDate';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { formatDate } from '@/lib/formatDate';
import { STUDY_ROLE, type StudyRole } from '@/types/studyRole';
import {
  CalendarCheck2Icon,
  CalendarSearchIcon,
  CircleXIcon,
  FileCog2Icon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { NOTES_TABLE_COLUMNS } from '../../main/notes/NotesTableColumns';
import { NotesMaximizeTable } from './NotesMaximizeTable';

type Props = {
  studyId: number;
  role: StudyRole;
  problemId?: number;
  page?: number;
  pageSize?: number;
  assignedDate?: string;
  bojNumber?: number;
  problemTitle?: string;
  updatedDate?: string;
  writer?: string;
  initialData: GetNotesResponse;
};

export const NotesMaximize = ({
  studyId,
  role,
  problemId,
  page,
  pageSize,
  assignedDate,
  bojNumber,
  problemTitle,
  updatedDate,
  writer,
  initialData,
}: Props) => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();
  const { data } = useNotesQuery(
    {
      studyId,
      problemId,
      page,
      pageSize,
      assignedDate,
      bojNumber,
      problemTitle,
      updatedDate,
      writer,
    },
    {
      initialData,
    },
  );
  const {
    openAssignedDate,
    setOpenAssignedDate,
    openUpdatedDate,
    setOpenUpdatedDate,
    selectedAssignedDate,
    selectedUpdatedDate,
    handleAssignedDateChange,
    handleUpdatedDateChange,
  } = useSelectDate();

  const isEditable = role === STUDY_ROLE.OWNER;

  const onClickTemplate = () => {
    router.push(
      buildUrlWithParams({
        url: PATH.STUDY.NOTE.TEMPLATE,
        pathParams: { studyId },
      }),
    );
  };

  const onClickRow = (note: GetNoteDetailResponse) => {
    if (isNavigating) {
      return;
    }

    startTransition(() => {
      router.push(
        buildUrlWithParams({
          url: PATH.STUDY.NOTE.DETAIL,
          pathParams: {
            studyId,
            noteId: note.id,
          },
        }),
      );
    });
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex h-9 flex-row items-center justify-between gap-3">
          <div className="flex flex-row items-end gap-3">
            <h2 className="text-2xl font-bold">문제 풀이 글</h2>
          </div>

          {isEditable && (
            <Button
              variant="secondary"
              size="icon-responsive"
              onClick={onClickTemplate}>
              <FileCog2Icon />
              <span className="hidden sm:inline">템플릿 관리</span>
            </Button>
          )}
        </div>

        <Separator />

        <div className="mt-3 flex flex-row items-center justify-between gap-4">
          <span className="text-muted-foreground shrink-0 font-medium whitespace-nowrap">
            {data?.count}개의 글
          </span>

          <div className="flex gap-2">
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
              <PopoverContent className="w-auto overflow-hidden p-0">
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
              <PopoverContent className="w-auto overflow-hidden p-0">
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
                className="h-9 pr-9"
              />
              {false && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {}}
                  className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 h-9 rounded-l-none hover:bg-transparent">
                  <CircleXIcon />
                  <span className="sr-only">검색어 초기화</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <NotesMaximizeTable
        data={data?.results ?? []}
        columns={NOTES_TABLE_COLUMNS}
        onClickRow={onClickRow}
      />
    </div>
  );
};
