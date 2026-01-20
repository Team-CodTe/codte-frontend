import { useState } from 'react';

import { useExitStudy } from './useExitStudy';

type Props = {
  expectedText: string;
};

export const useRemoveConfirmation = ({ expectedText }: Props) => {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const { mutateRemoveStudy, isRemovingStudy } = useExitStudy();

  const isConfirmValid = confirmText === expectedText;

  const handleChangeOpen = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      setConfirmText('');
    }
  };

  const handleConfirmTextChange = (value: string) => {
    setConfirmText(value);
  };

  const handleSubmit = () => {
    if (!isConfirmValid) {
      return;
    }

    mutateRemoveStudy();
  };

  return {
    confirmText,
    isConfirmValid,
    handleChangeOpen,
    handleConfirmTextChange,
    handleSubmit,
    open,
    isRemovingStudy,
  };
};
