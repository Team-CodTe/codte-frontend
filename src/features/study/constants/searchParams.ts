import { VIEW_METHOD } from '@/api/solve-status/getSolveStatus/type';
import { parseAsString, parseAsStringEnum } from 'nuqs';

export const SOLVE_STATUS_VIEW_PARSER = parseAsStringEnum(
  Object.values(VIEW_METHOD),
).withDefault(VIEW_METHOD.GROUP);

export const NOTES_FILTER_KEYWORD_PARSER = parseAsString
  .withDefault('')
  .withOptions({
    throttleMs: 300,
    shallow: false,
  });
