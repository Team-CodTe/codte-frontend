import { useState } from 'react';

import { format, isValid, parse } from 'date-fns';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';

import { DEFAULT_PAGE_SIZE } from '../../constants/notesPageOptions';
import { NOTES_FILTER_KEYWORD_PARSER } from '../../constants/searchParams';

const DATE_FORMAT = 'yyyy-MM-dd';

const QUERY_KEYS = {
  KEYWORD: 'query',
  ASSIGNED_DATE: 'assignedDate',
  CREATED_DATE: 'createdDate',
  PAGE: 'page',
  PAGE_SIZE: 'pageSize',
} as const;

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
    parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  );

  const selectedAssignedDate = parseDateFromUrl(assignedDateStr);
  const selectedCreatedDate = parseDateFromUrl(createdDateStr);

  const handleAssignedDateChange = (date: Date | undefined) => {
    setAssignedDateStr(date ? format(date, DATE_FORMAT) : null);
    setOpenAssignedDate(false);
    setPage(1);
  };

  const handleCreatedDateChange = (date: Date | undefined) => {
    setCreatedDateStr(date ? format(date, DATE_FORMAT) : null);
    setOpenCreatedDate(false);
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
    setPage(1);
    window.scrollTo({ top: 0 });
  };

  const handleFiltersReset = () => {
    setKeyword('');
    setAssignedDateStr(null);
    setCreatedDateStr(null);
    setPage(1);
  };

  return {
    keyword,
    setKeyword: handleKeywordChange,
    page,
    handlePageChange,
    pageSize,
    handlePageSizeChange,
    dateFilter: {
      openAssignedDate,
      openCreatedDate,
      setOpenAssignedDate,
      setOpenCreatedDate,
      selectedAssignedDate,
      selectedCreatedDate,
      handleAssignedDateChange,
      handleCreatedDateChange,
      formattedAssignedDate: assignedDateStr ?? undefined,
      formattedCreatedDate: createdDateStr ?? undefined,
    },
    handleFiltersReset,
  };
};
