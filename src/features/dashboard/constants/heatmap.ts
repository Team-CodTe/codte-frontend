export const RANGE_DAYS = 365;

export const WEEKDAY_LABELS: [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
] = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const MONTH_LABELS: [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
] = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
] as const;

export const LEGEND_ITEMS = [
  { label: '0', color: 'var(--secondary)' },
  {
    label: '1',
    color: 'color-mix(in oklch, var(--success) 20%, var(--secondary))',
  },
  {
    label: '2~3',
    color: 'color-mix(in oklch, var(--success) 40%, var(--secondary))',
  },
  {
    label: '4~5',
    color: 'color-mix(in oklch, var(--success) 70%, var(--secondary))',
  },
  { label: '6+', color: 'var(--success)' },
] as const;
