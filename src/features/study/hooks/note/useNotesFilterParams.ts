import { useState } from 'react';

import {
  getLocalStorageNumber,
  setLocalStorageNumber,
} from '@/lib/localStorageActions';
import { format, isValid, parse } from 'date-fns';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';

import {
  DATE_FORMAT,
  DEFAULT_PAGE_SIZE,
} from '../../constants/notesFilterOptions';
import { NOTES_FILTER_KEYWORD_PARSER } from '../../constants/searchParams';

const QUERY_KEYS = {
  KEYWORD: 'query',
  ASSIGNED_DATE: 'assignedDate',
  CREATED_DATE: 'createdDate',
  PAGE: 'page',
  PAGE_SIZE: 'pageSize',
} as const;

const NOTES_PAGE_SIZE_STORAGE_KEY = 'NOTES_PAGE_SIZE';

const parseDateFromUrl = (dateStr: string | null) => {
  if (!dateStr) {
    return undefined;
  }

  const parsed = parse(dateStr, DATE_FORMAT, new Date());

  return isValid(parsed) ? parsed : undefined;
};

export const useNotesFilterParams = () => {
  const [openAssignedDate, setOpenAssignedDate] = useState(false);
  const [openCreatedDate, setOpenCreatedDate] = useState(false);
  const [initialPageSize] = useState(() =>
    getLocalStorageNumber(NOTES_PAGE_SIZE_STORAGE_KEY, DEFAULT_PAGE_SIZE),
  );

  const [keyword, setKeyword] = useQueryState(
    QUERY_KEYS.KEYWORD,
    NOTES_FILTER_KEYWORD_PARSER,
  );
  const [assignedDateStr, setAssignedDateStr] = useQueryState(
    QUERY_KEYS.ASSIGNED_DATE,
    parseAsString,
  );
  const [createdDateStr, setCreatedDateStr] = useQueryState(
    QUERY_KEYS.CREATED_DATE,
    parseAsString,
  );
  const [page, setPage] = useQueryState(
    QUERY_KEYS.PAGE,
    parseAsInteger.withDefault(1),
  );

  const [pageSize, setPageSize] = useQueryState(
    QUERY_KEYS.PAGE_SIZE,
    parseAsInteger.withDefault(initialPageSize),
  );

  const selectedAssignedDate = parseDateFromUrl(assignedDateStr);
  const selectedCreatedDate = parseDateFromUrl(createdDateStr);

  const handleDateChange = (
    date: Date | undefined,
    setter: (value: string | null) => void,
    setOpen: (open: boolean) => void,
  ) => {
    setter(date ? format(date, DATE_FORMAT) : null);
    setOpen(false);
    setPage(1);
  };

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0 });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setLocalStorageNumber(NOTES_PAGE_SIZE_STORAGE_KEY, newPageSize);
    setPage(1);
    window.scrollTo({ top: 0 });
  };

  const handleFiltersReset = () => {
    setKeyword(null);
    setAssignedDateStr(null);
    setCreatedDateStr(null);
    setPage(1);
  };

  return {
    keyword: keyword || '',
    setKeyword: handleKeywordChange,
    page,
    handlePageChange,
    pageSize,
    handlePageSizeChange,
    dateFilter: {
      assigned: {
        isOpen: openAssignedDate,
        setIsOpen: setOpenAssignedDate,
        date: selectedAssignedDate,
        onSelect: (date: Date | undefined) =>
          handleDateChange(date, setAssignedDateStr, setOpenAssignedDate),
      },
      created: {
        isOpen: openCreatedDate,
        setIsOpen: setOpenCreatedDate,
        date: selectedCreatedDate,
        onSelect: (date: Date | undefined) =>
          handleDateChange(date, setCreatedDateStr, setOpenCreatedDate),
      },
    },
    handleFiltersReset,
    isFiltered: !!(keyword || assignedDateStr || createdDateStr),
  };
};
