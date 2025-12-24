'use client';

import { useEffect } from 'react';

import { PATH } from '@/constants/path';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { showToast } from '@/lib/showToast';
import { useRouter } from 'next/navigation';

type Props = {
  studyId: number;
  message: string;
};

export const AccessDeniedRedirect = ({ studyId, message }: Props) => {
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
