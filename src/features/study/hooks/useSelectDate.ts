import { useState } from 'react';

import { format } from 'date-fns';

export const useSelectDate = () => {
  const [openAssignedDate, setOpenAssignedDate] = useState(false);
  const [openUpdatedDate, setOpenUpdatedDate] = useState(false);

  const [selectedAssignedDate, setSelectedAssignedDate] = useState<
    Date | undefined
  >(undefined);
  const [selectedUpdatedDate, setSelectedUpdatedDate] = useState<
    Date | undefined
  >(undefined);

  const handleAssignedDateChange = (date: Date | undefined) => {
    setSelectedAssignedDate(date);
    setOpenAssignedDate(false);
  };

  const handleUpdatedDateChange = (date: Date | undefined) => {
    setSelectedUpdatedDate(date);
    setOpenUpdatedDate(false);
  };

  const formattedAssignedDate = selectedAssignedDate
    ? format(selectedAssignedDate, 'yyyy-MM-dd')
    : undefined;

  const formattedUpdatedDate = selectedUpdatedDate
    ? format(selectedUpdatedDate, 'yyyy-MM-dd')
    : undefined;

  return {
    openAssignedDate,
    openUpdatedDate,
    setOpenAssignedDate,
    setOpenUpdatedDate,
    selectedAssignedDate,
    selectedUpdatedDate,
    handleAssignedDateChange,
    handleUpdatedDateChange,
    formattedAssignedDate,
    formattedUpdatedDate,
  };
};
