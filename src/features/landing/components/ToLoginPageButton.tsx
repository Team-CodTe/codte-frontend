'use client';

import { Button } from '@/components/ui/Button';
import { PATH } from '@/constants/path';
import { useRouter } from 'next/navigation';

export const ToLoginPageButton = () => {
  const router = useRouter();

  return <Button onClick={() => router.push(PATH.LOGIN)}>로그인</Button>;
};
