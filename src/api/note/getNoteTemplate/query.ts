import {
  type OmittedQueryOptions,
  type OmittedSuspenseQueryOptions,
} from '@/lib/queryClient';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getNoteTemplate } from './fetch';
import { type GetNoteTemplateResponse } from './type';

export const useNoteTemplateQuery = (
  studyId: number,
  options?: OmittedQueryOptions<GetNoteTemplateResponse>,
) => {
  return useQuery({
    queryKey: ['study', 'note-template', studyId],
    queryFn: () => getNoteTemplate(studyId),
    ...options,
  });
};

export const useNoteTemplateSuspenseQuery = (
  studyId: number,
  options?: OmittedSuspenseQueryOptions<GetNoteTemplateResponse>,
) => {
  return useSuspenseQuery({
    queryKey: ['study', 'note-template', studyId],
    queryFn: () => getNoteTemplate(studyId),
    ...options,
  });
};
