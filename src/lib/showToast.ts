import { toast } from 'sonner';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

type ToastOptions = {
  message: string;
  type?: ToastType;
};

/**
 * Sonner Toast를 보여주는 함수
 * @param message
 * @param type
 */
export const showToast = ({ message, type }: ToastOptions) => {
  if (type && toast[type]) {
    toast[type](message, { closeButton: true });
  } else {
    toast(message, { closeButton: true });
  }
};
