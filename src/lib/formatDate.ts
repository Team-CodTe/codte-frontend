import { format } from 'date-fns';

type FormatOptions = {
  includeTime?: boolean;
};

/**
 * 날짜 형식을 변환하는 함수
 * @param dateInput
 * @param options
 * @returns 변환된 날짜 문자열
 */
export const formatDate = (
  dateInput: Date | string | number = new Date(),
  options: FormatOptions = { includeTime: true },
): string => {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    return '잘못된 날짜';
  }

  const dateFormat = 'yyyy. M. d.';
  const timeFormat = options.includeTime ? ' HH:mm' : '';

  return format(date, `${dateFormat}${timeFormat}`);
};
