import { useState } from 'react';

import { format, isValid, parse } from 'date-fns';
import { parseAsString, useQueryState } from 'nuqs';

const DATE_FORMAT = 'yyyy-MM-dd';

const QUERY_KEYS = {
  KEYWORD: 'q',
  ASSIGNED_DATE: 'assignedDate',
  UPDATED_DATE: 'updatedDate',
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
  const [openUpdatedDate, setOpenUpdatedDate] = useState(false);
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
  const [updatedDateStr, setUpdatedDateStr] = useQueryState(
    QUERY_KEYS.UPDATED_DATE,
    parseAsString,
  );

  const selectedAssignedDate = parseDateFromUrl(assignedDateStr);
  const selectedUpdatedDate = parseDateFromUrl(updatedDateStr);

  const handleAssignedDateChange = (date: Date | undefined) => {
    setAssignedDateStr(date ? format(date, DATE_FORMAT) : null);
    setOpenAssignedDate(false);
  };

  const handleUpdatedDateChange = (date: Date | undefined) => {
    setUpdatedDateStr(date ? format(date, DATE_FORMAT) : null);
    setOpenUpdatedDate(false);
  };

  const handleFiltersReset = () => {
    setKeyword('');
    setAssignedDateStr(null);
    setUpdatedDateStr(null);
  };

  return {
    keyword,
    setKeyword,
    dateFilter: {
      openAssignedDate,
      openUpdatedDate,
      setOpenAssignedDate,
      setOpenUpdatedDate,
      selectedAssignedDate,
      selectedUpdatedDate,
      handleAssignedDateChange,
      handleUpdatedDateChange,
      formattedAssignedDate: assignedDateStr ?? undefined,
      formattedUpdatedDate: updatedDateStr ?? undefined,
    },
    handleFiltersReset,
  };
};
