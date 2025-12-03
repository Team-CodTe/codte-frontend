'use client';

import { Button } from '@/components/ui/Button';
import { PATH } from '@/constants/path';
import { useRouter } from 'next/navigation';

export const ToLoginPageButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(PATH.LOGIN)}>스터디 시작하기</Button>
  );
};
