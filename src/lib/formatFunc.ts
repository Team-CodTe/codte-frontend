import { format, startOfDay } from 'date-fns';

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
  let date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    date = startOfDay(new Date());
  }

  const dateFormat = 'yyyy. M. d.';
  const timeFormat = options.includeTime ? ' HH:mm' : '';

  return format(date, `${dateFormat}${timeFormat}`);
};

/**
 * 남은 시간을 반환해주는 함수
 * @param targetDate
 * @param baseDate
 * @returns 남은 시간 (분, 초 단위)
 */
export const formatRemainingTime = (
  targetDate: Date,
  baseDate = new Date(),
) => {
  const diffMS = targetDate.getTime() - baseDate.getTime();

  if (diffMS <= 0) return '';

  const minutes = Math.floor(diffMS / (1000 * 60));
  const seconds = Math.floor((diffMS % (1000 * 60)) / 1000);

  return minutes > 0 ? `${minutes}분 ${seconds}초` : `${seconds}초`;
};

/**
 * 백분율 형식을 변환하는 함수
 * @param value
 * @param decimals
 * @returns 변환된 백분율
 */
export const formatPercentage = (value: number, decimals: number = 2) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'percent',
    maximumFractionDigits: decimals,
  }).format(value);
};
