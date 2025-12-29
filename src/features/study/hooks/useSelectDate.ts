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

    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');

      console.log(formattedDate);
    }

    setOpenAssignedDate(false);
  };

  const handleUpdatedDateChange = (date: Date | undefined) => {
    setSelectedUpdatedDate(date);

    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');

      console.log(formattedDate);
    }

    setOpenAssignedDate(false);
  };

  return {
    openAssignedDate,
    openUpdatedDate,
    setOpenAssignedDate,
    setOpenUpdatedDate,
    selectedAssignedDate,
    selectedUpdatedDate,
    handleAssignedDateChange,
    handleUpdatedDateChange,
  };
};
