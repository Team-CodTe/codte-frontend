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

/**
 * API 에러를 처리하고 사용자에게 적절한 토스트 메시지를 보여주는 함수
 * @param error         - 발생한 에러 객체 (FetchError 인스턴스 등)
 * @param defaultMessage - 기본으로 표시할 에러 메시지
 * @param defaultType    - 기본 토스트 타입 ('error' | 'info' 등), 기본값은 'error'
 * @param errorMapping   - 에러 코드별로 사용자 정의 메시지 및 타입을 지정할 수 있는 매핑 객체 (선택)
 */
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
