'use client';

import { useEffect } from 'react';

import { PATH } from '@/constants/path';
import { showToast } from '@/lib/showToast';
import { useRouter } from 'next/navigation';

type Props = {
  isExpired: boolean;
};

export const LoginSessionHandler = ({ isExpired }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (isExpired) {
      showToast({
        message: '세션이 만료되었습니다. 다시 로그인해주세요.',
        type: 'error',
      });

      router.replace(PATH.LOGIN);
    }
  }, [isExpired, router]);

  return null;
};
