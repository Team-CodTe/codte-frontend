import { VIEW_METHOD } from '@/api/solve-status/getSolveStatus/type';
import { parseAsStringEnum } from 'nuqs';

export const SOLVE_STATUS_VIEW_PARSER = parseAsStringEnum(
  Object.values(VIEW_METHOD),
).withDefault(VIEW_METHOD.GROUP);
