import { FetchError } from '@/lib/fetchInstance';
import { showToast, type ToastType } from '@/lib/showToast';
import { type ApiErrorData } from '@/types/apiErrorData';

type ErrorMapping = {
  [errorCode: string]:
    | { message?: string; type?: ToastType }
    | ((message: string) => { message?: string; type?: ToastType });
};

type HandleApiErrorOptions = {
  error: Error;
  defaultMessage: string;
  defaultType?: ToastType;
  errorMapping?: ErrorMapping;
};

export const handleApiError = ({
  error,
  defaultMessage,
  defaultType = 'error',
  errorMapping = {},
}: HandleApiErrorOptions) => {
  let toastMessage = defaultMessage;
  let toastType: ToastType = defaultType;

  if (error instanceof FetchError) {
    const { errorCode, message } = (error.data as ApiErrorData) || {};

    if (errorCode && errorMapping[errorCode]) {
      const mapping = errorMapping[errorCode];
      const result =
        typeof mapping === 'function' ? mapping(message ?? '') : mapping;

      toastMessage = result.message ?? message ?? defaultMessage;
      toastType = result.type ?? defaultType;
    }
  }

  showToast({
    message: toastMessage,
    type: toastType,
  });
};
