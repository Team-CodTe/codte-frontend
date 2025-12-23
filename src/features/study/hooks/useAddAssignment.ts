import { useState } from 'react';

import { useAddAssignmentMutation } from '@/api/daily-assignment/postAddAssignment/mutation';
import { FetchError } from '@/lib/fetchInstance';
import { showToast } from '@/lib/showToast';
import { type ApiErrorData } from '@/types/apiErrorData';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  studyId: number;
};

export const useAddAssignment = ({ studyId }: Props) => {
  const queryClient = useQueryClient();
  const [bojNumber, setBojNumber] = useState('');
  const [open, setOpen] = useState(false);

  const { mutate: mutateAddAssignment, isPending: isAdding } =
    useAddAssignmentMutation(studyId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['study', 'daily-assignments', studyId],
        });

        showToast({
          message: '문제가 추가되었습니다.',
          type: 'success',
        });

        setBojNumber('');
        setOpen(false);
      },
      onError: (error) => {
        let toastMessage = '오류가 발생했습니다. 다시 시도해주세요.';

        if (error instanceof FetchError) {
          const { errorCode, message } = (error.data as ApiErrorData) || {};

          if (errorCode === 'ALREADY_ASSIGNED') {
            toastMessage = message;
          } else if (errorCode === 'PROBLEM_NOT_FOUND') {
            toastMessage = message;
          }
        }

        showToast({
          message: toastMessage,
          type: 'error',
        });
      },
    });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      onReset();
    }
  };

  const onSubmit = () => {
    if (bojNumber.trim()) {
      mutateAddAssignment({ bojNumber: parseInt(bojNumber, 10) });
    }
  };

  const onReset = () => {
    setBojNumber('');
  };

  return {
    bojNumber,
    setBojNumber,
    open,
    setOpen,
    handleOpenChange,
    onSubmit,
    canSubmit: bojNumber.trim(),
    isAdding,
  };
};
