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
    return '';
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

/**
 * 숫자를 천 단위 콤마가 포함된 문자열로 변환하는 함수
 * @param value - 변환할 숫자 값
 * @returns 콤마가 포함된 숫자 문자열 (예: 1000 → "1,000")
 */
export const formatNumberWithComma = (value: number | null): string => {
  if (value === null) {
    return '';
  }

  return value.toLocaleString('ko-KR');
};

/**
 * 콤마가 포함된 숫자 입력값을 파싱하여 순수 숫자로 변환하는 함수
 * @param value - 콤마가 포함된 문자열 (예: "1,000")
 * @returns 파싱된 숫자 또는 null (빈 문자열이거나 유효하지 않은 경우)
 */
export const parseNumberWithComma = (value: string): number | null => {
  const cleanedValue = value.replace(/,/g, '');

  if (cleanedValue === '') {
    return null;
  }

  if (!/^\d+$/.test(cleanedValue)) {
    return null;
  }

  return parseInt(cleanedValue, 10);
};

/**
 * 콤마가 포함된 숫자 입력값을 파싱하여 순수 숫자로 변환하는 함수
 * @param e
 * @param onChange
 */
export const handleChangeNumberWithComma = (
  e: React.ChangeEvent<HTMLInputElement>,
  onChange: (value: number | null) => void,
) => {
  const parsedValue = parseNumberWithComma(e.target.value);

  onChange(parsedValue);
};
