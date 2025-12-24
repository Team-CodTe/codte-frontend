import { useState } from 'react';

import { useExitStudy } from './useExitStudy';

type Props = {
  studyId: number;
  expectedText: string;
};

export const useRemoveConfirmation = ({ studyId, expectedText }: Props) => {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const { mutateRemoveStudy, isRemovingStudy } = useExitStudy({ studyId });

  const isConfirmValid = confirmText === expectedText;

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      onReset();
    }
  };

  const handleConfirmTextChange = (value: string) => {
    setConfirmText(value);
  };

  const onSubmit = () => {
    if (isConfirmValid) {
      mutateRemoveStudy();
    }
  };

  const onReset = () => {
    setConfirmText('');
  };

  return {
    confirmText,
    isConfirmValid,
    handleOpenChange,
    handleConfirmTextChange,
    onSubmit,
    onReset,
    open,
    isRemovingStudy,
  };
};
