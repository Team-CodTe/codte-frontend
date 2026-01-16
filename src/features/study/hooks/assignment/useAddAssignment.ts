import { useState } from 'react';

import { useCustomAssignmentMutation } from '@/api/assignment/postCustomAssignment/mutation';
import { useParamInt } from '@/hooks/useParamInt';
import { handleApiError } from '@/lib/handleApiError';
import { showToast } from '@/lib/showToast';
import { useQueryClient } from '@tanstack/react-query';

export const useAddAssignment = () => {
  const studyId = useParamInt('studyId');
  const queryClient = useQueryClient();
  const [bojNumber, setBojNumber] = useState('');
  const [open, setOpen] = useState(false);

  const { mutate: mutateAddAssignment, isPending: isAdding } =
    useCustomAssignmentMutation(studyId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['study', 'daily-assignments', studyId],
        });

        queryClient.invalidateQueries({
          queryKey: ['study', 'solve-status', studyId],
        });

        queryClient.invalidateQueries({
          queryKey: ['study', 'solve-statistics', studyId],
        });

        showToast({
          message: '문제가 추가되었습니다.',
          type: 'success',
        });

        setBojNumber('');
        setOpen(false);
      },
      onError: (error) => {
        handleApiError({
          error,
          defaultMessage: '오류가 발생했습니다. 다시 시도해주세요.',
          errorMapping: {
            ALREADY_ASSIGNED: (message) => ({ message }),
            PROBLEM_NOT_FOUND: (message) => ({ message }),
          },
        });
      },
    });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      setBojNumber('');
    }
  };

  const handleSubmit = () => {
    if (isAdding || !bojNumber.trim()) {
      return;
    }

    mutateAddAssignment({ bojNumber: parseInt(bojNumber, 10) });
  };

  return {
    bojNumber,
    setBojNumber,
    open,
    setOpen,
    handleOpenChange,
    handleSubmit,
    canSubmit: !isAdding && bojNumber.trim(),
    isAdding,
  };
};
