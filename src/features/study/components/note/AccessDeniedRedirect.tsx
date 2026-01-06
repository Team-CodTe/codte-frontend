'use client';

import { useEffect } from 'react';

import { PATH } from '@/constants/path';
import { useParamInt } from '@/hooks/useParamInt';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { showToast } from '@/lib/showToast';
import { useRouter } from 'next/navigation';

type Props = {
  message: string;
};

export const AccessDeniedRedirect = ({ message }: Props) => {
  const studyId = useParamInt('studyId');
  const router = useRouter();

  useEffect(() => {
    showToast({
      message,
      type: 'warning',
    });

    router.replace(
      buildUrlWithParams({
        url: PATH.STUDY.MAIN,
        pathParams: { studyId },
      }),
    );
  }, [studyId, message, router]);

  return null;
};
