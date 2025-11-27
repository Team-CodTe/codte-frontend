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
    return 'Invalid Date';
  }

  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  if (options.includeTime) {
    formatOptions.hour = '2-digit';
    formatOptions.minute = '2-digit';
    formatOptions.hour12 = false;
  }

  return date.toLocaleString('ko-KR', formatOptions);
};
