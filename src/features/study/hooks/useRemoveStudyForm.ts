import { useState } from 'react';

type Props = {
  studyName: string;
};

export const useRemoveConfirmation = ({ studyName }: Props) => {
  const [confirmText, setConfirmText] = useState('');

  const expectedText = `${studyName} 삭제`;
  const isConfirmValid = confirmText === expectedText;

  const handleConfirmTextChange = (value: string) => {
    setConfirmText(value);
  };

  const resetForm = () => {
    setConfirmText('');
  };

  return {
    confirmText,
    expectedText,
    isConfirmValid,
    handleConfirmTextChange,
    resetForm,
  };
};
