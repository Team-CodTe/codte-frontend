import { useState } from 'react';

import {
  VALIDATION_STATUS,
  type ValidationStatus,
} from '../types/validationStatus';

type Props<T> = {
  mutationFn: (variables: T) => Promise<unknown>;
  onSuccess?: () => void;
  onError?: (error: unknown) => string;
};

export const useValidator = <T>({ mutationFn, onError }: Props<T>) => {
  const [status, setStatus] = useState<ValidationStatus>(
    VALIDATION_STATUS.IDLE,
  );
  const [validatedValue, setValidatedValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = async (value: string, payload: T) => {
    setStatus(VALIDATION_STATUS.VALIDATING);
    setErrorMessage(null);

    try {
      await mutationFn(payload);

      setStatus(VALIDATION_STATUS.VALID);
      setValidatedValue(value);
    } catch (error) {
      setStatus(VALIDATION_STATUS.INVALID);
      setErrorMessage(onError ? onError(error) : '오류가 발생했습니다.');
    }
  };

  const reset = () => {
    setStatus(VALIDATION_STATUS.IDLE);
    setValidatedValue('');
    setErrorMessage(null);
  };

  const setInvalid = (message: string) => {
    setStatus(VALIDATION_STATUS.INVALID);
    setValidatedValue('');
    setErrorMessage(message);
  };

  return {
    status,
    validatedValue,
    errorMessage,
    validate,
    reset,
    setInvalid,
    isValid: status === VALIDATION_STATUS.VALID,
  };
};
