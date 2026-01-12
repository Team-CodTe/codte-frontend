import { useState } from 'react';

import { format, isValid, parse } from 'date-fns';
import { parseAsString, useQueryState } from 'nuqs';

const DATE_FORMAT = 'yyyy-MM-dd';

const QUERY_KEYS = {
  KEYWORD: 'q',
  ASSIGNED_DATE: 'assignedDate',
  CREATED_DATE: 'createdDate',
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
    parseAsString.withDefault('').withOptions({
      throttleMs: 300,
      shallow: false,
    }),
  );
  const [assignedDateStr, setAssignedDateStr] = useQueryState(
    QUERY_KEYS.ASSIGNED_DATE,
    parseAsString,
  );
  const [createdDateStr, setCreatedDateStr] = useQueryState(
    QUERY_KEYS.CREATED_DATE,
    parseAsString,
  );

  const selectedAssignedDate = parseDateFromUrl(assignedDateStr);
  const selectedCreatedDate = parseDateFromUrl(createdDateStr);

  const handleAssignedDateChange = (date: Date | undefined) => {
    setAssignedDateStr(date ? format(date, DATE_FORMAT) : null);
    setOpenAssignedDate(false);
  };

  const handleCreatedDateChange = (date: Date | undefined) => {
    setCreatedDateStr(date ? format(date, DATE_FORMAT) : null);
    setOpenCreatedDate(false);
  };

  const handleFiltersReset = () => {
    setKeyword('');
    setAssignedDateStr(null);
    setCreatedDateStr(null);
  };

  return {
    keyword,
    setKeyword,
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
