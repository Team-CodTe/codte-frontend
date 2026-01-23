import { safeParseInt } from '@/lib/parseParam';
import { useParams } from 'next/navigation';

/**
 * URL 파라미터 값을 숫자로 변환해 반환하는 훅
 * @param key URL 파라미터의 키 이름 (예: `'studyId'`, `'noteId'`)
 * @returns 파라미터 값을 `Number`로 변환한 값 (값이 없거나, 배열이거나, 숫자가 아닐 경우 `NaN`을 반환)
 */
export const useParamInt = (key: string): number => {
  const params = useParams();

  return safeParseInt(params[key]);
};
